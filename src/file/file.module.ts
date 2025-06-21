import { Module } from '@nestjs/common';
import { FilesController } from '../file/file.controller';
import { FileService } from "../file/file.service";

@Module({
    controllers: [FilesController],
    providers: [FileService],
})
export class FilesModule {}