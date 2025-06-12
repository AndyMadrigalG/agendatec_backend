import { Injectable } from '@nestjs/common';
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import axios from 'axios';
import * as firebaseAdmin from 'firebase-admin';

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

    async registerUser(registerUser: RegisterUserDto) {
        //console.log(registerUser);
        try {
            const userRecord = await firebaseAdmin.auth().createUser({
                displayName: registerUser.firstName + ' ' + registerUser.lastName,
                email: registerUser.email,
                password: registerUser.password,
            });

            if (userRecord && userRecord.uid) {
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
