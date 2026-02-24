FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

ENV DEBUG=playground:* 

USER node

CMD ["npm", "start"]
