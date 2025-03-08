import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { BaseUser, NewUser } from 'src/users/users.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: NewUser, @Res() res: FastifyReply) {
    const { accessToken } = await this.authService.signIn(body);

    res.setCookie('jwt', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return res.send({ message: 'Sign in successful' });
  }

  @Post('signup')
  async signup(@Body() body: BaseUser, @Res() res: FastifyReply) {
    const { accessToken } = await this.authService.signUp(body);

    res.setCookie('jwt', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return res.send({ message: 'Sign up successful' });
  }
}
