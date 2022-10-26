
Docker
docker build -t dmitriyivkov/bsp-web .
docker run -dp 80:80 dmitriyivkov/bsp-web
docker push dmitriyivkov/bsp-web

https://docs.docker.com/engine/reference/commandline/push/
https://labs.play-with-docker.com/p/ccfvlf5d48eg00a5fb7g

docker system prune


FROM jarredsumner/bun:edge
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install three dat.gui express
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun", "index.js"]

FROM node
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
#COPY bun.lockb bun.lockb
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
