replace form with 'submitted' submitting
tutoring/101
free lesson
retry new fonts
how to add icon within text box -> add (?) -> more info about text box ie payment service
invoice via venmo



"prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
docker build -t dmitriyivkov/bsp-web .
docker run -dp 80:80 dmitriyivkov/bsp-web
docker push dmitriyivkov/bsp-web

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
