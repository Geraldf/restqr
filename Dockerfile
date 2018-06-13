FROM node:8.9-alpine
ENV NODE_ENV production
ENV http_proxy http://10.0.128.11:3128
ENV https_proxy https://10.0.128.11:3128
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD npm start