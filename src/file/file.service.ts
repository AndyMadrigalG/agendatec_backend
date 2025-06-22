import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';


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

    async uploadFile(file: Express.Multer.File) {
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
        return new Promise((resolve, reject) => {
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
    }
}