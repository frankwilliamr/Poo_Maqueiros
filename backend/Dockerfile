FROM node:21.7.3-slim

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 8080

CMD ["npm", "start"]