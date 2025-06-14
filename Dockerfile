# Dockerfile to build a Node.js application with Alpine Linux
# --- Etapa 1: Builder ---
# En esta etapa compilamos la aplicación de TypeScript a JavaScript
ARG NODE_VERSION=22.16
ARG ALPINE_VERSION=3.22
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder

WORKDIR /usr/src/app

# Copiamos los archivos de dependencias
COPY package*.json ./
RUN npm install

# COMENTAR en caso de testing local
# Copiar el archivo secreto proporcionado por Docker
RUN --mount=type=secret,id=firebase_json cat /run/secrets/firebase_json > /usr/src/app/firebase_service_account.json

# DESCOMENTAR en caso de testing local
#COPY firebase_service_account.json /usr/src/app/firebase_service_account.json

# Copiamos el resto del código fuente para ser compilado a JavaScript
COPY src ./src
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .

# Generar el cliente de Prisma
COPY prisma ./prisma
RUN npx prisma generate

# Ejecutamos el comando para compilar el código
RUN npm run build

# --- Etapa 2: Producción ---
# La imagen final que se ejecutará en producción sera mucho más ligera
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copiamos los archivos de dependencias
COPY package*.json ./
# Instalamos SOLO las dependencias de producción, esto deberia reducir el tamaño de la imagen final
RUN npm install --omit=dev

# Copiar SOLO archivos necesarios desde la etapa 'builder', no necesitamos el codigo src typescript
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/firebase_service_account.json /usr/src/app/firebase_service_account.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/generated ./generated

CMD ["npm", "run", "start:prod"]