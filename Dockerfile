# Dockerfile to build a Node.js application with Alpine Linux
# --- Etapa 1: Builder ---
# En esta etapa compilamos la aplicación de TypeScript a JavaScript
ARG NODE_VERSION=22.16
ARG ALPINE_VERSION=3.22
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS builder

WORKDIR /usr/src/app

# Debug: Imprime el contenido de FIREBASE_JSON para verificar que se haya pasado correctamente
RUN echo "DebugDockerfile1 FIREBASE_JSON content:" && echo "$FIREBASE_JSON"
RUN echo "DebugDockerfile2 FIREBASE_JSON content:" && echo $FIREBASE_JSON
RUN echo "DebugDockerfile3 FIREBASE_JSON content:" && echo "${FIREBASE_JSON}"

# Copiamos el archivo de configuración de Firebase
COPY firebase_service_account.json /usr/src/app/firebase_service_account.json

COPY package*.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
# TO BE IMPLEMENTED >> configuration for Prisma ORM

# Ejecutamos el comando de build para compilar el código
RUN npm run build

# --- Etapa 2: Producción ---
# La imagen final que se ejecutará en producción sera mucho más ligera
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copiamos los archivos de dependencias
COPY package*.json ./
# TO BE IMPLEMENTED >> COPY Prisma config file

COPY src ./src
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .

# Instalamos ÚNICAMENTE las dependencias de producción, esto reduce drásticamente el tamaño de la imagen
RUN npm install --omit=dev

# Copiamos la aplicación ya compilada desde la etapa 'builder', No necesitamos el código fuente de TypeScript
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/firebase_service_account.json /usr/src/app/firebase_service_account.json

CMD ["npm", "run", "start:prod"]