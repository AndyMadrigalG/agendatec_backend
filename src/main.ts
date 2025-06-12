import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import * as firebaseAdmin from 'firebase-admin';
//import * as fs from 'fs';
//import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configuracion del documento Swagger para documentación de la API
  const config = new DocumentBuilder()
      .setTitle('Agendatec API')
      .setDescription(
          'Esta es la documentacion del API para la solucion para agendar sesiones de junta AgendaTec',
      )
      .setDescription('0.1.1')
      .addTag('AgendaTec')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  // Configura el endpoint de Swagger bajo la ruta /api_swagger
  SwaggerModule.setup('api_swagger', app, document);

  // firebase auth initialization
  // let firebaseKeyFilePath: string;
  // if(os.platform() === 'win32') {
  //   // If the environment is Windows
  //   firebaseKeyFilePath = './firebase_service_account.json';
  // } else {
  //   // If the environment is Linux
  //   firebaseKeyFilePath = '../../../../firebase_service_account.json';
  // }
  // const firebaseServiceAccount /*: ServiceAccount*/ = JSON.parse(
  //     fs.readFileSync(firebaseKeyFilePath).toString(),
  // );
  //
  // if (firebaseAdmin.apps.length === 0) {
  //   firebaseAdmin.initializeApp({
  //     credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
  //   });
  //   console.log('Initialized Firebase Auth');
  // }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
