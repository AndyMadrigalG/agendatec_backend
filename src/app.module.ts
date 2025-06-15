import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AgendasController } from './agendas/agendas.controller';
import { AgendasModule } from './agendas/agendas.module';
import { AgendasService } from './agendas/agendas.service';
import { PuntosController } from './puntos/puntos.controller';
import { PuntosService } from './puntos/puntos.service';
import { PuntosModule } from './puntos/puntos.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      AuthModule,
      UsuariosModule,
      AgendasModule,
      PuntosModule
  ],
  controllers: [AppController, UsuariosController, AgendasController, PuntosController],
  providers: [AppService, UsuariosService, AgendasService, PuntosService],
})
export class AppModule {}
