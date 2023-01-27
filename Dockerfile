# Nodejs Base image
FROM node:18-slim AS development
WORKDIR /logbook/frontend/src/app
# install and app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
# add app
COPY . .
# build app
RUN npm run build
# expose port
EXPOSE 4200