FROM node:18.12.1
WORKDIR /usr/src//app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "./src/index.js"]
