import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateSpaceDto } from './dto/create-space-dto';
import { AddUser } from './guards/addUser.guard';

import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllSpaces() {
    return this.spaceService.getAllSpaces();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createSpace(@Body() createSpaceDto: CreateSpaceDto, @User() user: any) {
    return this.spaceService.creaeteSpace(createSpaceDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteSpace(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.deleteSpace(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/user/role')
  getUserRole(@Param('id', ParseIntPipe) id: number, @User() user: any) {
    return this.spaceService.getUserRole(user.userId, id);
  }

  @UseGuards(JwtAuthGuard, AddUser)
  @Post(':id/user')
  addNewUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('newId') newId: number,
    @Body('role') role: string,
  ) {
    return this.spaceService.addNewUser(newId, id, role);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/all/users')
  getAllUsers(@Param('id', ParseIntPipe) id: number) {
    return this.spaceService.getAllUsers(id);
  }
}
