import {Controller, Get, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Valida que la API está funcionando'
  })
  is_api_up(): string {
    return this.appService.is_api_up();
  }

}
