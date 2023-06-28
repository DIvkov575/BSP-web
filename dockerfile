FROM node:19-alpine
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]