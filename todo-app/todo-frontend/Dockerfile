FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

# production stage: nginx
FROM nginx:1.27-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80