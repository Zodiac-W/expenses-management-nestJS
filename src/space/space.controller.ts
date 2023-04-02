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
}
