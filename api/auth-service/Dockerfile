FROM node:latest

WORKDIR /usr/app

COPY package.json .

COPY ./src ./src

RUN npm install --quiet

RUN npm install nodemon --global

CMD ["nodemon", "index.js"]