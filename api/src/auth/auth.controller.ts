import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userData) {
    return await this.authService.signup(userData);
  }

  @Post('signin')
  async signin(@Body() credentials) {
    console.log('signin');
    return await this.authService.signin(credentials);
  }
}
