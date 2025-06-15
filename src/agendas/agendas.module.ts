import { Module } from '@nestjs/common';
import { AgendasController } from './agendas.controller';
import { AgendasService } from './agendas.service';

@Module({
  controllers: [AgendasController],
  providers: [AgendasService]
})
export class AgendasModule {}