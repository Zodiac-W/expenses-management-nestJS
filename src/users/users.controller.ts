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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [CreateUserDto],
  })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUser();
  }

  @ApiOperation({ summary: 'Get all users names' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of all users names',
    type: [String],
  })
  @UseGuards(JwtAuthGuard)
  @Get('all/names')
  getAllUsersName() {
    return this.usersService.getAllUsersName();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID',
    type: CreateUserDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the user to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID has been deleted',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The updated user data',
    type: User,
  })
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
