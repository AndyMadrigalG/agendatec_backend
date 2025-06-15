import { Module } from '@nestjs/common';
import { MiembroJuntaController } from './miembroJunta.controller';
import { MiembroJuntaService } from './miembroJunta.service';

@Module({
    controllers: [MiembroJuntaController],
    providers: [MiembroJuntaService],
})
export class MiembroJuntaModule {}
