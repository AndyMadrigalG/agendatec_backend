import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiConsumes } from "@nestjs/swagger";

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @ApiConsumes('multipart/form-data') // Indica que este endpoint consume datos de formulario
    @UseInterceptors(FileInterceptor('file'))
    async uploadToBucket(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return { message: 'No file uploaded' };
        }
        const uploadResult = await this.fileService.uploadFile(file);
        return { message: 'File uploaded successfully', results: uploadResult };
    }
}