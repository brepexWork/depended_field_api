FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 2525

CMD ["node", "./dist/index.js"]