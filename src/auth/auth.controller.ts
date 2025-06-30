import { Controller, Post, HttpStatus, UsePipes, ValidationPipe, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Aquí definimos los endpoints relacionados con la autenticación

    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Inicia sesión y devuelve un token de acceso'
    })
    loginUser(@Body() loginDto: LoginUserDto) {
        return this.authService.loginUser(loginDto);
    }

    @Post('register')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Registra un nuevo usuario para acceder a la aplicacion'
    })
    registerUser(@Body() registerUserDTo: RegisterUserDto) {
        return this.authService.registerUser(registerUserDTo);
    }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Busca los tokens de auth del usuario'
    })
    async authorizeUser(@Headers('Authorization') authHeader: string, @Headers('refresh-token') refreshToken: string){
        const idToken = authHeader?.split(' ')[1]; // Extraer el idToken del encabezado
        if (!idToken && !refreshToken) {
            return { valid: false, message: 'Tokens no encontrados' };
        }
        return this.authService.validateTokens(idToken,refreshToken);
    }
}
