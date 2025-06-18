import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DEV_URL = process.env.DEV_FRONTEND_URL || 'http://localhost:3001'
const PROD_URL = process.env.PROD_URL || 'https://agendatec-frontend-371160271556.us-central1.run.app'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [DEV_URL,PROD_URL], // Configura el origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite el envío de cookies y encabezados de autorización
  });

   // Configuracion del documento Swagger para documentación de la API
  const config = new DocumentBuilder()
      .setTitle('Agendatec API')
      .setDescription(
          'Esta es la documentacion del API para la solucion para agendar sesiones de junta AgendaTec',
      )
      .setDescription('0.1.2')
      .addTag('AgendaTec')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  // Configura el endpoint de Swagger bajo la ruta /api_swagger
  SwaggerModule.setup('api_swagger', app, document);



  console.log("la database url: "+process.env.DATABASE_URL);
  console.log(" la firebase api: "+process.env.FIREBASE_API_KEY);
  await app.listen(process.env.BACKEND_PORT ?? 8080); // in prod needs to be 8080
}
bootstrap();
