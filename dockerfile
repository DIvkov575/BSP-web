FROM oven/bun
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install

COPY  dist/ dist/
COPY server.ts server.ts
COPY tsconfig.json tsconfig.json

EXPOSE 3000
ENTRYPOINT ["bun",  "server.ts"]
