FROM node:8.9-alpine

ENV http_proxy http://10.0.128.11:3128
ENV https_proxy https://10.0.128.11:3128
WORKDIR /usr/app
RUN echo --------
RUN echo http_proxy
RUN env
COPY package.json .
RUN npm config set https-proxy http://10.0.128.11:3128 \
    && npm install 
COPY . .
EXPOSE 3000
CMD npm start