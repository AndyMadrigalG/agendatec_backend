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
import { JuntaController } from './junta/junta.controller';
import { JuntaModule } from './junta/junta.module';
import { JuntaService } from './junta/junta.service';
import { MiembroJuntaController } from './miembroJunta/miembroJunta.controller';
import { MiembroJuntaService } from './miembroJunta/miembroJunta.service';
import { MiembroJuntaModule } from './miembroJunta/miembroJunta.module';
import { FileService } from "./file/file.service";
import { FilesController } from "./file/file.controller";
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
  controllers: [AppController, UsuariosController, AgendasController, PuntosController, JuntaController, MiembroJuntaController, FilesController ],
  providers: [AppService, UsuariosService, AgendasService, PuntosService, JuntaService, MiembroJuntaService, FileService ],
})
export class AppModule {}
