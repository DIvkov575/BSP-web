FROM oven/bun
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .
EXPOSE 3000
ENTRYPOINT ["bun",  "server.ts"]
