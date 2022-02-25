FROM node:16
WORKDIR /synapse-api
COPY . .
RUN npm install
EXPOSE 80
ENV port=80
CMD [ "npm", "start" ]
