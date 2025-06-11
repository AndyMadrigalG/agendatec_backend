import {Controller, Post, HttpStatus} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Aquí definimos los endpoints relacionados con la autenticación
    @Post('login')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Inicia sesión y devuelve un token de acceso'
    })
    login(): string {
        return this.authService.login();
    }

    @Post('register')
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Registra un nuevo usuario para acceder a la aplicacion'
    })
    register(): string {
        return this.authService.register();
    }
}
