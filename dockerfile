FROM oven/bun

COPY . .
RUN bun install

# COPY package.json package.json
# COPY bun.lockb bun.lockb
# RUN bun install
# COPY .env .env
# COPY google-service-cred.json google-service-cred.json`
# COPY  dist/ dist/
# COPY server.ts server.ts
# COPY tsconfig.json tsconfig.json

EXPOSE 3000
ENTRYPOINT ["bun",  "server.ts"]
