FROM node:11.5.0
EXPOSE 8080
WORKDIR /virtual_web_application
COPY package*.json ./
RUN npm install
COPY src/app.js src/app.js 
CMD ["npm", "run", "start"]
