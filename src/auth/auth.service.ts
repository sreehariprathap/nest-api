/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signIn() {
    return { message: 'I have signed in' };
  }

  async signUp(dto: AuthDto) {
    // generate the password
    const hash = await argon.hash(dto.password);
    // save the new user in db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName:dto.firstName,
          lastName:dto.lastName
        },
      });
      delete user.hash; // remove the hash from the user data
      // return the saved user
      return user;
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          throw new ForbiddenException(
            'Credentials already taken'
          )
        }
      }
      throw error;
    }
  }

  async getUsers(){
    const users = await this.prisma.user.findMany();
    return users;
  }
}
