/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signIn() {
    return { message: 'I have signed in' };
  }

  async signUp(dto: AuthDto) {
    // generate the password
    const hash = await argon.hash(dto.password);
    // save the new user in deb
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        firstName:dto.firstName,
        lastName:dto.lastName
      },
    });
    // return the saved user
    return user;
  }

  async getUsers(){
    const users = await this.prisma.user.findMany();
    return users;
  }
}
