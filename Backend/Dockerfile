FROM node:16

    WORKDIR /usr/src/app/Backend

    COPY package*.json ./

    RUN cd /usr/src/app/Backend && npm install && npm i --location=global nodemon

    EXPOSE 5000

    CMD ["npm", "start"]


    