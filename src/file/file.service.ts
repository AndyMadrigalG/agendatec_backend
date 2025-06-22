import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import prisma from '../prisma.service';

@Injectable()
export class FileService {
    private storage: Storage;
    private bucketName: string;

    constructor() {
        this.storage = new Storage({
            keyFilename: './agendatec-gcp-service-account.json', // Ruta al archivo de credenciales
        });
        this.bucketName = 'agendatec-bucket'; // Nombre del bucket
    }

    async uploadFile(param_puntoID: number, file: Express.Multer.File) {
        const bucket = this.storage.bucket(this.bucketName);
        if (!file || !file.buffer) {
            throw new Error('No file uploaded or file buffer is empty');
        }
        // Crea un blob en el bucket con el nombre del archivo original
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype, // Establece el tipo de contenido del archivo
        });
        const response = new Promise((resolve, reject) => {
            blobStream.on('error', (err) => {
                console.error('Error uploading file:', err);
                reject(err);
            });

            blobStream.on('finish', () => {
                console.log(`File ${file.originalname} uploaded successfully.`);
                resolve({
                    message: 'File uploaded successfully',
                    fileName: file.originalname,
                    bucket: this.bucketName,
                });
            });

            blobStream.end(file.buffer); // Usa el buffer del archivo subido
        });
        // Guarda la referencia del archivo en la base de datos
        try {
            const fileRecord = await prisma.archivo.create({
                data: {
                    nombre: file.originalname,
                    url: `https://storage.googleapis.com/${this.bucketName}/${file.originalname}`,
                    puntoId: param_puntoID, // cambiar a puntoId, tiene que venir del request
                },
            });
            console.log('File record created in database:', fileRecord);
            return {
                message: 'File uploaded and record saved to database',
                fileName: fileRecord.nombre,
                url: fileRecord.url,
                puntoId: fileRecord.puntoId,
            };
        } catch (error) {
            console.error('Error saving file record to database:', error);
            return {
                message: 'File uploaded but could not save record to database',
                error: error.message,
            }
        }
    }
}