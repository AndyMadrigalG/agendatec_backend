import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './file.controller';
import { FileService } from "./file.service";

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads', // Directorio donde se guardarán los archivos subidos
            limits: {
                fileSize: 10 * 1024 * 1024, // Límite de tamaño de archivo (10 MB)
            },
        }),
    ],
    controllers: [FilesController],
    providers: [FileService],
})
export class FilesModule {}