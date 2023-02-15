import { createModel } from "@rematch/core";
import { toast } from "react-toastify";

import {
  cleanUserTokensFromLocalStorage,
  getAccessToken,
  getIsAuthenticated,
  getRefreshToken,
  setUserTokensToLocalStorage,
} from "../../helpers/user";
import {
  ACTIVATE_SUBSCRIPTION_URL,
  CHECK_SUBSCRIPTION_URL,
  DETACH_PAYMENT_METHODS,
  FULL_SIGN_OUT_URL,
  GET_PAYMENT_METHODS_URL,
  RESET_PASSWORD_URL,
  SIGN_IN_URL,
  SIGN_OUT_URL,
  SIGN_UP_URL,
  UPDATE_USER_AVATAR,
  UPDATE_USERNAME,
} from "../constants/api-contstants";
import { SIGN_IN_ROUTE } from "../constants/route-constants";
import { STRIPE_INACTIVE_STATUS } from "../constants/stripe-constants";
import http from "../http/http-common";
import type { RootModel } from "./index";

type UserState = {
  isAuthenticated: boolean;
  accessToken: "";
  refreshToken: "";
  paymentMethods: Array<{ id: string; card: { brand: string; last4: string } }>;
  subscription: { nickname: string; status: string };
};

export const user = createModel<RootModel>()({
  state: {
    isAuthenticated: getIsAuthenticated(),
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    paymentMethods: [],
    subscription: { nickname: "", status: STRIPE_INACTIVE_STATUS },
  } as UserState,
  reducers: {
    setIsAuthenticated(state, { isAuthenticated }) {
      return {
        ...state,
        isAuthenticated,
      } as UserState;
    },

    setTokens(state, { accessToken, refreshToken }) {
      return {
        ...state,
        accessToken,
        refreshToken,
      };
    },

    setPaymentMethods(state, paymentMethods) {
      return {
        ...state,
        paymentMethods,
      };
    },

    setSubscription(state, subscription) {
      return {
        ...state,
        subscription,
      };
    },

    setUser(state, user) {
      return {
        ...state,
        ...user,
      }
    }
  },
  effects: (dispatch) => ({
    async signUp({ username, email, password, router }) {
      // TODO processing error...
      // eslint-disable-next-line no-useless-catch
      try {
        const result = await http.post(SIGN_UP_URL, {
          username,
          email,
          password,
        });
        if (result.status === 201) {
          router.push(SIGN_IN_ROUTE);
        }
      } catch (err) {
        throw err;
      }
    },

    async signIn({ username, password }) {
      // TODO processing error...
      // eslint-disable-next-line no-useless-catch
      try {
        const result: any = await http.post(SIGN_IN_URL, {
          username,
          password,
        });
        if (result.status === 201) {
          dispatch.user.setIsAuthenticated({ isAuthenticated: true });
          dispatch.user.setTokens({
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          });
          setUserTokensToLocalStorage(result.data.accessToken, result.data.refreshToken);
          await this.checkSubscription();
        }
        if (result.request.status === 403) {
          toast.error(result.response?.data?.message || "Incorrect credentials");
        }
      } catch (error) {
        throw error;
      }
    },

    async signOut({ router }) {
      // TODO processing error...
      // eslint-disable-next-line no-useless-catch
      try {
        const result = await http.post(SIGN_OUT_URL, { refreshToken: getRefreshToken() });
        if (result.status === 201) {
          this.logOutUser({ router });
        }
      } catch (error) {
        throw error;
      }
    },

    async fullSignOut({ router }) {
      // TODO processing error...
      // eslint-disable-next-line no-useless-catch
      try {
        const result = await http.post(FULL_SIGN_OUT_URL);
        if (result.status === 201) {
          this.logOutUser({ router });
        }
      } catch (error) {
        throw error;
      }
    },

    async getUser(id: string) {
      try {
        const result = await http.get(`${UPDATE_USERNAME}${id}`);
        if (result.status === 200) {
          dispatch.user.setUser(result.data)
        }
      } catch (error) {
        throw error;
      }
    },

    async resetPassword({ oldPassword, newPassword, confirmPassword }) {
      // TODO processing error...
      // eslint-disable-next-line no-useless-catch
      try {
        const result = await http.post(RESET_PASSWORD_URL, {
          oldPassword,
          newPassword,
          confirmPassword,
        });
        if (result.request.status === 201) {
          toast.success("Password updated!");
          this.logOutUser();
        }
        if (result.request.status === 400) {
          toast.error("Password does not match");
        }
      } catch (err) {
        throw err;
      }
    },

    async updateUsername(username) {
      // TODO processing error...
      // eslint-disable-next-line no-useless-catch
      try {
        const result = await http.put(UPDATE_USERNAME, {
          username,
        });
        if (result.status === 200) {
          const newUsername = result.data.username;
          dispatch.user.setUser({ username: newUsername});
          toast.success(`Username is updated! Your new username is: ${newUsername}`);
        }
        if (result.status === 400) {
          toast.error("User with that username already exists!");
        }
      } catch (err) {
        throw err;
      }
    },

    async updateUserAvatar({ avatar, router }) {
      // TODO processing error...
      // eslint-disable-next-line no-useless-catch
      try {
        const formData = new FormData();
        formData.append("file", avatar, avatar.name);
        const result = await http.post(
          UPDATE_USER_AVATAR,

          formData,

          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (result.status === 201) {
          toast.success(`User Profile picture is updated!`);
          router.push(SIGN_IN_ROUTE);
        }
        if (result.status === 400) {
          toast.error("Profile picture is not updated!");
        }
      } catch (err) {
        throw err;
      }
    },

    async activateSubscription({
      paymentMethodId,
      priceId,
    }): Promise<{ clientSecret: string; status: string; nickname: string | null }> {
      const { data } = await http.post(ACTIVATE_SUBSCRIPTION_URL, {
        paymentMethod: paymentMethodId,
        priceId,
      });

      return data;
    },

    async detachPaymentMethod(paymentMethodId) {
      const res = await http.post(DETACH_PAYMENT_METHODS, {
        paymentMethodId,
      });
      if (res.data) {
        const newArr = user.state.paymentMethods.filter((pM) => {
          return pM.id !== paymentMethodId;
        });
        dispatch.user.setPaymentMethods(newArr);
        toast.success("Card was detached successfully!");
      }
    },

    async getPaymentMethods() {
      const res = await http.get(GET_PAYMENT_METHODS_URL);
      dispatch.user.setPaymentMethods(res.data);
    },

    async checkSubscription() {
      const res = await http.get(CHECK_SUBSCRIPTION_URL);
      if (res.data) {
        dispatch.user.setSubscription(res.data);
      }
    },

    logOutUser({ router }) {
      dispatch.user.setIsAuthenticated({ isAuthenticated: false });
      cleanUserTokensFromLocalStorage();
      router.push(SIGN_IN_ROUTE);
    },
  }),
});
