FROM node:11.5.0
EXPOSE 8080
WORKDIR /web-application
COPY package*.json ./
RUN npm install
COPY src/presentation-layer/app.js src/app.js
CMD ["npm", "run", "start"]
