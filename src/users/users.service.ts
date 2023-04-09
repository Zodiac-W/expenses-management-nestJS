import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signupUser(createUserDto: CreateUserDto): Promise<any> {
    const {
      user_name,
      user_email,
      user_phone,
      user_pass,
      user_role,
      user_expiration,
      user_total_transactions,
      user_spaces,
      user_is_active,
    } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user_pass, salt);

    const user = new User();
    user.user_name = user_name;
    user.user_email = user_email;
    user.user_phone = user_phone;
    user.user_pass = hash;
    user.user_role = user_role;
    user.user_expiration = user_expiration;
    user.user_total_transactions = user_total_transactions;
    user.user_spaces = user_spaces;
    user.user_is_active = user_is_active;

    if (
      (user_expiration === null ||
        user_total_transactions === null ||
        user_spaces === null) &&
      user_role !== 'superuser'
    ) {
      throw new Error('ERROR ADDING NULL TO REGULA USERS');
    }

    await this.userRepository.save(user);

    const { user_pass: pass, ...userPassed } = user;

    return userPassed;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const { user_email, user_pass } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { user_email },
    });

    if (!user) {
      throw Error('Incorrect Email');
    }
    const match = await bcrypt.compare(user_pass, user.user_pass);

    if (!match) {
      throw Error('Incorrect password');
    }

    const { user_pass: pass, ...userPassed } = user;
    return userPassed;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    const userId = user.id;
    return { userId };
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  async getAllUsers(): Promise<any> {
    const users = await this.userRepository.find({ select: ['user_name'] });

    return users;
  }

  async deleteUser(id: number): Promise<any> {
    const user = this.getOneUser(id);

    await this.userRepository.softDelete(id);

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    let user = await this.userRepository.findOne({ where: { id } });
    user = { ...user, ...updateUserDto };
    await this.userRepository.save(user);
    return user;
  }

  async getUserByPhone(phone: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { user_phone: phone },
    });
    if (!user) {
      throw new NotFoundException('This user does not use SS ');
    } else {
      return user;
    }
  }

  async updateUserData(user: User): Promise<any> {
    await this.userRepository.save(user);
  }

  async activateUser(id: number): Promise<any> {
    const user = await this.getOneUser(id);
    user.user_is_active = true;

    await this.updateUserData(user);
    return user;
  }

  async disableUser(id: number): Promise<any> {
    const user = await this.getOneUser(id);
    user.user_is_active = false;

    await this.updateUserData(user);
    return user;
  }
}
