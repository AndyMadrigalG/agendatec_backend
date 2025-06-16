import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as firebaseAdmin from 'firebase-admin';
import * as fs from 'fs';
import * as path from "node:path";

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

  // firebase auth initialization
  let firebaseServiceAccount: firebaseAdmin.ServiceAccount | undefined = undefined;
  const firebaseFilePath : string = path.join(__dirname, '..', 'firebase_service_account.json');

  if (!fs.existsSync(firebaseFilePath)) {
    console.log('Firebase service account key file not found at:', firebaseFilePath);
  } else {
    console.log('Firebase service account key file found at:', firebaseFilePath);
    const raw = fs.readFileSync(firebaseFilePath, 'utf8');

    try {
      firebaseServiceAccount = JSON.parse(raw);
    } catch (error) {
      console.error('Error parsing Firebase service account JSON:', error);
    }

  }

  if (firebaseAdmin.apps.length === 0 && firebaseServiceAccount !== undefined) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    });
    console.log('Initialized Firebase Auth');
  }
  console.log("la database url: "+process.env.DATABASE_URL);
  console.log(" la firebase api: "+process.env.FIREBASE_API_KEY);
  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
