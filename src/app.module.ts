import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { JuntaController } from './junta/junta.controller';
import { JuntaModule } from './junta/junta.module';
import { JuntaService } from './junta/junta.service';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      AuthModule,
      UsuariosModule,
      JuntaModule
  ],
  controllers: [AppController, UsuariosController, JuntaController],
  providers: [AppService, UsuariosService, JuntaService],
})
export class AppModule {}
