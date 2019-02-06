FROM node:11.5.0
EXPOSE 8080
WORKDIR /web_application
COPY package*.json ./
RUN npm install
COPY src src
CMD ["npm", "run", "start"]
