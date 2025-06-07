import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  is_api_up(): string {
    return 'Hello, AgendaTec API is Up!';
  }

}
