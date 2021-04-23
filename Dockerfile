FROM node:lts

WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
RUN npm run build
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD npm start
