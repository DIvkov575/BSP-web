FROM node:19-alpine
COPY . .
RUN npm install
CMD ["node", "server.js"]