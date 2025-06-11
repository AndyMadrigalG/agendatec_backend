import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    login(): string {
        return 'Poner aquí la lógica de autenticación';
    }

    register(): string {
        return 'Poner aquí la lógica de registro de usuario';
    }
}
