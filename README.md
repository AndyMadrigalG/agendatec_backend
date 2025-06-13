# AgendaTec Backend
This is a backend API project made with [Nest](https://github.com/nestjs/nest) a TypeScript framework repository

## Project dependencies
If you want to run this project inside a Docker container, you need to have [Docker](https://www.docker.com/get-started) installed

To run this project you need to install [Node JS](https://nodejs.org/en/download) and then start downloading the project dependencies

```bash
# Get all the node packages needed to run this project
npm install
```

## Compile and run the project
Choose one of the following commands to compile and run the project depending on your environment:
```bash
# compile the project
npm run build
```

```bash
# run the project from the build folder
npm run start
```

```bash
# Compile and then run the project - this is the same as running `npm run build` and then `npm run start` in one command
npm run up
```

```bash
# This script is for Development purposes, uses watch mode which enables live reload or "hot reload"
# This will automatically recompile the project when you make changes to the source code
npm run start:dev
```

```bash
# production mode is meant to be run inside a Docker container
npm run start:prod
```

## Deployment - Dev Environment - Docker
To run the Dockerfile locally and generate a docker image that can generate containers, use this command:

```bash
# Build Dockerfile into a Docker image 
docker compose up
```

```bash
# Double check you can build the Docker image into a test image before deploying to production
docker build -t test-image:testing .
```

```bash
# Run the Docker image in a container
docker run -p 3000:3000 test-image:testing
```

## Deployment - Prod Environment - GCP Cloud Run
When you are ready to deploy to production, make sure you have [gcloud CLI](https://cloud.google.com/cli) installed and configured:

```bash
# Authenticate with your Google Cloud account
gcloud init
```

## Swagger
This Swagger provides a user interface to see the documentation of the API

On production go to [https://agendatec-backend-371160271556.us-central1.run.app/api_swagger
](https://agendatec-backend-371160271556.us-central1.run.app/api_swagger)

And for development go to [http://localhost:3000/api_swagger](http://localhost:3000/api_swagger)

## License
Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE)