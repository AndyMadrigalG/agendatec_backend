import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './file.controller';
import { FileService } from "./file.service";

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads', // Directorio donde se guardarán los archivos subidos
        }),
    ],
    controllers: [FilesController],
    providers: [FileService],
})
export class FilesModule {}