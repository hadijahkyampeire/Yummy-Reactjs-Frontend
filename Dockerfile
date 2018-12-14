FROM node:carbon 

LABEL maintainer="Hadijah" 

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]



