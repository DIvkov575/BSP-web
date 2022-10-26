FROM node
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
#COPY bun.lockb bun.lockb
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
