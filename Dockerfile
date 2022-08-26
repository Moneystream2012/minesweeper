FROM node:18
RUN apt-get update
WORKDIR /usr/app
COPY . .
RUN yarn add -D nodemon
RUN yarn

EXPOSE 3001

CMD ["yarn", "dev"]
