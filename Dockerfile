FROM node:18-alpine

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN mkdir -p /home/node/frontApp/

WORKDIR /home/node/frontApp

COPY package*.json ./
COPY tsconfig*.json ./

COPY . .

RUN npm install

#COPY --chown=node:node . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]