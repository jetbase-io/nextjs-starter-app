FROM node:16-alpine
WORKDIR /home/app
COPY . /home/app
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]