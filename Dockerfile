# Development
FROM node:18-slim AS development
WORKDIR /logbook/frontend/src/app
# install and app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli

# RUN npm run build

# expose port
EXPOSE 443

CMD [ "npm", "run", "build" ]

# Production
FROM node:18-slim AS production
# set environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /logbook/frontend/src/app
# add app
COPY --from=development /logbook/frontend/src/app/ .
# expose port
EXPOSE 443
# start app
CMD ["ng", "serve"]