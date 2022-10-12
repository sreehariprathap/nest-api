/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signIn() {
    return { message: 'I have signed up' };
  }

  signUp() {
    return { message: 'I have signed in' };
  }
}
