
# Dockerfile for building a Node.js application with Alpine Linux
ARG NODE_VERSION=22.16
ARG ALPINE_VERSION=3.22

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src ./src
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
# TO BE IMPLEMENTED >> configuration for Prisma ORM

RUN npm run build

# Final image for running the application
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine${ALPINE_VERSION}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist/ ./dist/

COPY package*.json ./
# TO BE IMPLEMENTED >> COPY Prisma config file

COPY src ./src
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .

RUN npm install

CMD ["npm", "run", "start:prod"]