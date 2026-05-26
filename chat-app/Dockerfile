FROM node:18-alpine

WORKDIR /app

COPY back/package*.json ./
RUN npm install

COPY back/ .

EXPOSE 3000

CMD ["node", "server.js"]