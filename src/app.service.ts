import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  is_api_up(): string {
    return 'AgendaTec Backend API esta funcionando correctamente';
  }

}
