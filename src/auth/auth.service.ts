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
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.APIKEY}`;
        return await this.sendPostRequest(url, {
            email,
            password,
            returnSecureToken: true,
        });
    }

    async loginUser(payload: LoginUserDto) {
        const { email, password } = payload;

        try {
            const response = await this.signInWithEmailAndPassword(email, password);
            let output = {};
            if( response && response.idToken) {
                // TO-DO: create a user dto to return the user data
                output = {
                    accessToken: response.idToken,
                    refreshToken: response.refreshToken,
                    expiresIn: response.expiresIn,
                };
            } else {
                output = { response }
            }
            return output;
        } catch (error: any) {
            if (error.message.includes('EMAIL_NOT_FOUND')) {
                throw new Error('User not found.');
            } else if (error.message.includes('INVALID_PASSWORD')) {
                throw new Error('Invalid password.');
            } else {
                throw new Error(error.message);
            }
        }

    }

    async registerUser(registerUser: RegisterUserDto) {
        console.log(registerUser);
        try {
            const userRecord = await firebaseAdmin.auth().createUser({
                displayName: registerUser.firstName,
                email: registerUser.email,
                password: registerUser.password,
            });

            console.log('User Record:', userRecord);
            return userRecord;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User registration failed'); // Handle errors
        }
    }
}
