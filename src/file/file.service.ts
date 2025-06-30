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
            blobStream.on('finish', async () => {
                const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${file.originalname}`;
                // console.log(`File ${file.originalname} uploaded successfully.`);

                try {
                    // Crear el registro en Prisma
                    const fileRecord = await prisma.archivo.create({
                        data: {
                            nombre: file.originalname,
                            url: publicUrl,
                            puntoId: param_puntoID,
                        },
                    });
                    //console.log('File record created in database:', fileRecord.url);
                    resolve(fileRecord.url);
                } catch (err) {
                    console.error('Error saving to database:', err);
                    reject(err);
                }
            });

            blobStream.end(file.buffer); // Usa el buffer del archivo subido
        });
        // Espera a que se complete la subida y se cree el registro en la base de datos
        return response;
    }
}