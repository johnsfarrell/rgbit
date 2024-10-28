FROM node:18.17.0-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ \
    && apk add --no-cache pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev

RUN npm install -g npm@9.6.7

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
