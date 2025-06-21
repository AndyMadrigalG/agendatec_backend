import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files')) // 'files' es el nombre del campo en el formulario
    async uploadFiles(@UploadedFiles() file: any) {
        const result = await this.fileService.uploadFile(file);
        return { message: 'Files uploaded successfully', results: result };
    }
}