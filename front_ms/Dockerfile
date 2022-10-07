FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install --silent

RUN npm install react-scripts@3.4.1 -g --silent

CMD ["npm", "start"]

EXPOSE 3000