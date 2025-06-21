import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';


@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('file')) // 'file' es el nombre del campo en el formulario
    async uploadToBucket(@UploadedFile() file) {
        console.log('File received:', file);
        // if (!file) {
        //     return { message: 'No file uploaded' };
        // }

        const result = await this.fileService.uploadFile(file);
        return { message: 'Files uploaded successfully', results: result };
    }
}