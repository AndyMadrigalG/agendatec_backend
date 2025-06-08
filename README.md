
# AgendaTec Backend

## Description
A backend API proyect made with [Nest](https://github.com/nestjs/nest) a TypeScript framework repository.

## Prerequisites
Install Node JS and then start downloading the dependencies

## Project dependencies
Install all packages by running
```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. 

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

### Local Dev

Run Docker locally and then
```bash
docker compose up
```

## Swagger

To view this API documentation go to [localhost:3000/api_swagger](http://localhost:3000/api_swagger)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
