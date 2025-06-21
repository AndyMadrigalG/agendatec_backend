import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';


@Injectable()
export class FileService {
    private storage: Storage;
    private bucketName: string;

    constructor() {
        this.storage = new Storage({
            keyFilename: '../../firebase-service-account.json', // Ruta al archivo de credenciales
        });
        this.bucketName = 'agendatec-bucket'; // Nombre del bucket
    }

    async uploadFile(file): Promise<string> {
        const bucket = this.storage.bucket(this.bucketName);
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        return new Promise((resolve, reject) => {
            blobStream.on('error', (err) => reject(err));
            blobStream.on('finish', () => resolve(`File ${file.originalname} uploaded successfully`));
            blobStream.end(file.buffer);
        });
    }
}