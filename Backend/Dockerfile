FROM node:16

WORKDIR /usr/src/app/Backend

COPY package*.json ./

RUN cd /usr/src/app/Backend && npm install && npm i --location=global nodemon

RUN chown -Rh node:node /usr/src/app

USER node

EXPOSE 5000

CMD [ "sh", "-c", "npm install && npm run start" ]



