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

    async uploadFile(file) {
        const bucket = this.storage.bucket(this.bucketName);
        //const result = await bucket.upload("C:\\uploadTest\\imagen1.png")
        //return result;
        return true
    }
}