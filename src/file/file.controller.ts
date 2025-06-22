import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiConsumes } from "@nestjs/swagger";

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @ApiConsumes('multipart/form-data') // Indica que este endpoint consume datos de formulario
    @UseInterceptors(FileInterceptor('file'))
    async uploadToBucket(@UploadedFile() file: Express.Multer.File, @Body('puntoId') puntoID: string) {
        if (!file) {
            return { message: 'No file uploaded' };
        }

        const IntPuntoID = parseInt(puntoID);
        const uploadResult = await this.fileService.uploadFile(IntPuntoID, file);
        return { message: 'File uploaded successfully', results: uploadResult };
    }
}