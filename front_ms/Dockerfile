FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install --quiet

RUN npm install react-scripts@3.4.1 -g --quiet

CMD ["npm", "start"]

EXPOSE 3000