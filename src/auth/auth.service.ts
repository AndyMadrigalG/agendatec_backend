import { Injectable } from '@nestjs/common';
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import * as firebaseAdmin from 'firebase-admin';
import axios from 'axios';
import prisma from "../prisma.service";

@Injectable()
export class AuthService {

    private async sendPostRequest(url: string, data: any) {
        try {
            const response = await axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.log('error', error);
        }
    }

    private async signInWithEmailAndPassword(email: string, password: string) {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.FIREBASE_API_KEY;
        const result = await this.sendPostRequest(url, {
            email,
            password,
            returnSecureToken: true,
        });
        return result;
    }

    async loginUser(payload: LoginUserDto) {
        const { email, password } = payload;

        try {
            const response = await this.signInWithEmailAndPassword(email, password);
            let output = {};
            if( response && response.idToken) {
                // TO-DO: create a user dto to return the user data
                output = {
                    username: response.displayName,
                    email : response.email,
                    idToken : response.idToken,
                    refreshToken: response.refreshToken,
                    expiresIn: response.expiresIn,
                };
            }
            else if (response === undefined) {
                output = {
                    error: {
                        message: 'Correo electrónico o contraseña inválidos',
                        code: 400
                    }
                }
            }
            return output;
        } catch (error: any) {
            //console.error('Error during login:', error);
            throw new Error(error.message);
        }
    }

    async registerUserInDatabase(my_user: RegisterUserDto) {
        try {
            const newUser =  await prisma.usuario.create({
                data: {
                    nombre: my_user.nombre,
                    email: my_user.email,
                    telefono: my_user.telefono,
                },
            });
            return newUser;

        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    async registerUser(registerUser: RegisterUserDto) {
        //console.log(registerUser);
        try {
            const userRecord = await firebaseAdmin.auth().createUser({
                displayName: registerUser.nombre,
                email: registerUser.email,
                password: registerUser.password,
            });

            if (userRecord && userRecord.uid) {
                // Register user in the database
                const newUser = await this.registerUserInDatabase(registerUser);
                return {
                    message: 'Usuario creado exitosamente',
                    displayName: userRecord.displayName,
                    email: userRecord.email
                }
            }
        } catch (error) {
            return {
                error: {
                    message: 'Error creando usuario: ' + error.message,
                    code: error.status || 400,
                    details: error.code || null
                }
            }
        }
    }
}
