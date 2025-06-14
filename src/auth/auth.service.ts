import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    document: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(document);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name, document: user.document, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}