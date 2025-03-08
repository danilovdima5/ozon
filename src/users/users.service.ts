/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BaseUser, NewUser, ExistingUser } from './users.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: ExistingUser[] = [];

  async create(newUser: NewUser): Promise<ExistingUser> {
    const user: ExistingUser = {
      ...newUser,
      id: uuidv4(),
    };

    this.users.push(user);

    return user;
  }

  async findByName(
    name: ExistingUser['name'],
  ): Promise<ExistingUser | undefined> {
    return this.users.find((user) => user.name === name);
  }

  async check({ name, password }: BaseUser): Promise<boolean> {
    const user = await this.findByName(name);

    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }

    return false;
  }
}
