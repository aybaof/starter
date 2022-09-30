FROM node:16

    WORKDIR /usr/src/app/Frontend

    COPY package*.json ./

    RUN cd /usr/src/app/Frontend && npm install

    EXPOSE 4800

    CMD ["npm", "start"]


    