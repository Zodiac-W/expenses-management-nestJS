import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupUser(createUserDto: CreateUserDto) {
    const user = await this.userService.signupUser(createUserDto);
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.loginUser(loginUserDto);
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUsers(payload: any): Promise<any> {
    const user = await this.userService.getUser(payload.sub);

    if (user) {
      return user;
    }
    return null;
  }
}
