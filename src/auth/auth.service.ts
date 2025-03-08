import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BaseUser } from '../users/users.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: BaseUser) {
    const exists = await this.usersService.check(credentials);

    if (!exists) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.usersService.findByName(credentials.name);

    const payload = { username: user!.name, sub: user!.id };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async signUp(credentials: BaseUser) {
    const user = await this.usersService.findByName(credentials.name);

    if (user) {
      throw new ConflictException('User with this name already exists');
    }

    const newUser = await this.usersService.create(credentials);

    const payload = { username: newUser.name, sub: newUser.id };

    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
