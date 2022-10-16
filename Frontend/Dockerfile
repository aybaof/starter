FROM node:16

WORKDIR /usr/src/app/Frontend

COPY package*.json ./

RUN cd /usr/src/app/Frontend && npm install

RUN chown -Rh node:node /usr/src/app

USER node

EXPOSE 4800

CMD [ "sh", "-c", "npm install && npm run start" ]



