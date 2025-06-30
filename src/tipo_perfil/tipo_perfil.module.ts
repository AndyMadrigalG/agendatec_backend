import { Module } from '@nestjs/common';
import { TipoPerfilController } from './tipo_perfil.controller';
import { TipoPerfilService } from './tipo_perfil.service';

@Module({
    controllers: [TipoPerfilController],
    providers: [TipoPerfilService]
})
export class TipoPerfilModule {}