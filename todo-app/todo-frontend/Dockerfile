FROM node:20 AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

FROM deps AS test
RUN npm run test

FROM deps AS build
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80