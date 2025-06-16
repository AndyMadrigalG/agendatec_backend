import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromRequest(request);
        if (!token) throw new UnauthorizedException('Token no proporcionado');

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            request.user = decodedToken;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }

    private extractTokenFromRequest(req: any): string | null {
        if (req.headers.authorization?.startsWith('Bearer ')) {
            return req.headers.authorization.split(' ')[1];
        }
        if (req.cookies?.token) {
            return req.cookies.token;
        }
        return null;
    }
}