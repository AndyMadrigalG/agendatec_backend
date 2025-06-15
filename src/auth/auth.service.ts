import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import * as firebaseAdmin from 'firebase-admin';
import axios from 'axios';
import prisma from "../prisma.service";
import * as process from "node:process";

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
        const { usuario, contrasena } = payload;

        try {
            const response = await this.signInWithEmailAndPassword(usuario, contrasena);
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
        } catch (error) {
            return {
                error: {
                    message: 'Error en login: ' + error.message,
                    code: error.status || 400,
                    details: error.code || null
                }
            }
        }
    }

    async registerUserInDatabase(my_user: RegisterUserDto) {
        try {
            const newUser =  await prisma.usuario.create({
                data: {
                    nombre: my_user.usuario,
                    email: my_user.correo,
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

        try {
            const userRecord = await firebaseAdmin.auth().createUser({
                displayName: registerUser.usuario,
                email: registerUser.correo,
                password: registerUser.contrasena,
            });

            if (userRecord && userRecord.uid) {
                // Register user in the database
                const userRegisterResponse = await this.registerUserInDatabase(registerUser);

                if (!userRegisterResponse || !userRegisterResponse.id_Usuario) {
                    console.error('Error creando usuario en la base de datos');
                    return {
                        error: {
                            message: 'Error creando usuario en la base de datos',
                            code: 400,
                        },
                    };
                } else {
                    // Redirige al login después de registrar al usuario
                    return {
                        statusCode: 302,
                        url: '/auth/login',
                    };
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

    async validateTokens(idToken: string, refreshToken: string) {
        try {
            // Verificar el idToken con Firebase Admin
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
            if (decodedToken?.uid) {
                console.log('idToken válido!');
                return {
                    statusCode: HttpStatus.OK
                };
            }
        } catch (error) {
            console.error('idToken inválido:', error.message);

            // Si el idToken es inválido, usar el refreshToken para obtener un nuevo idToken
            const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`;
            const response = await axios.post(url, {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            });

            if (response.data && response.data.id_token) {
                return { valid: true, idToken: response.data.id_token };
            }

            return {
                statusCode: 302,
                url: '/login',
            };
        }
    }
}
