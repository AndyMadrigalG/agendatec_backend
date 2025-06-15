import { Module } from '@nestjs/common';
import { JuntaController } from './junta.controller';
import { JuntaService } from './junta.service';

@Module({
  controllers: [JuntaController],
  providers: [JuntaService],
})
export class JuntaModule {}
