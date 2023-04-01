import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signupUser(createUserDto: CreateUserDto): Promise<any> {
    const { name, email, phone, password } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User();
    user.user_name = name;
    user.user_email = email;
    user.user_phone = phone;
    user.user_pass = hash;

    await this.userRepository.save(user);

    const { user_pass, ...userPassed } = user;

    return userPassed;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { user_email: email },
    });

    if (!user) {
      throw Error('Incorrect Email');
    }
    const match = await bcrypt.compare(password, user.user_pass);

    if (!match) {
      throw Error('Incorrect password');
    }

    const { user_pass, ...userPassed } = user;
    return userPassed;
  }
}
