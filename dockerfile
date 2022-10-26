FROM jarredsumner/bun:edge
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
#COPY bun.lockb bun.lockb
RUN bun install
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun", "index.js"]
