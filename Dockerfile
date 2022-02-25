FROM node:16
WORKDIR /synapse-api
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]
