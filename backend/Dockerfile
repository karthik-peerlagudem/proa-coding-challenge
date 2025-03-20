FROM node:20-alpine3.20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run db:generate
RUN npm run db:migrate
RUN npm run db:seed

EXPOSE 3001

CMD npm run prod
