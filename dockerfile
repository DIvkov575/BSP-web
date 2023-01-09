FROM node:alpine
WORKDIR /usr/programming/bsp-web
COPY package.json .
COPY package-lock.json .
RUN npm install
  # && npm install typescript -g
COPY . .
# RUN tsc
CMD ["node", "./dist/index.js"]
