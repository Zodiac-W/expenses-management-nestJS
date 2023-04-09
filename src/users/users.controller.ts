import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateUser(@User() user: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('activate/:id')
  activateUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.activateUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('disable/:id')
  disableUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.disableUser(id);
  }
}
