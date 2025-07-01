import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AgendasModule } from './agendas/agendas.module';
import { PuntosModule } from './puntos/puntos.module';
import { JuntaModule } from './junta/junta.module';
import { MiembroJuntaModule } from './miembroJunta/miembroJunta.module';
import { FilesModule } from "./file/file.module";
import { TipoPerfilModule } from './tipo_perfil/tipo_perfil.module';
import { PerfilModule } from './perfil/perfil.module';


@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      AuthModule,
      UsuariosModule,
      AgendasModule,
      PuntosModule,
      JuntaModule,
      MiembroJuntaModule,
      FilesModule,
      TipoPerfilModule,
      PerfilModule,
        // Aquí puedes agregar otros módulos que necesites importar
  ],
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
