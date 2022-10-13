/* eslint-disable prettier/prettier */
import { Controller, HttpStatus, Post } from '@nestjs/common';
import { Body, Get, HttpCode } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }
}
