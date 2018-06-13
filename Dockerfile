FROM node:8.9-alpine
ENV NODE_ENV production
ENV http_proxy http://10.70.20.17:8080
ENV https_proxy https://10.70.20.17:8080
run npm config set https-proxy https://10.70.20.17:8080
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm config set proxy http://10.70.20.17:8080 &&\
    npm config set https-proxy https://10.70.20.17:8080 &&\
    npm install --production  && mv node_modules ../
COPY . .
EXPOSE 3000
CMD npm start