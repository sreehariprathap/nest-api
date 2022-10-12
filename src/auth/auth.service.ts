/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signIn() {
    return { message: 'I have signed in' };
  }

  signUp(params) {
    return params
  }
}
