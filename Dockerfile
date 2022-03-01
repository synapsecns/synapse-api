FROM node:16
WORKDIR /synapse-api
COPY . .
RUN npm install
RUN npm run-script gendoc
EXPOSE 8080
CMD [ "npm", "start" ]
