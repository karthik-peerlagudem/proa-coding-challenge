FROM node:20-alpine3.20 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
COPY .env ./
RUN npm run build

FROM nginx:1.27.3
COPY --from=build /app/dist /var/www/html/

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]