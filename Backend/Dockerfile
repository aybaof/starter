FROM node:16

    WORKDIR /usr/src/app/Backend

    COPY package*.json ./

    RUN npm install && npm i --location=global nodemon

    EXPOSE 5000

    CMD ["npm", "start"]


    