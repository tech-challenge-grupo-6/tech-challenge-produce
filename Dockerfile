FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3333

RUN npm run build

CMD ["npm", "start"]