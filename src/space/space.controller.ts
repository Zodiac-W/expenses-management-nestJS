import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateSpaceDto } from './dto/create-space-dto';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createSpace(@Body() createSpaceDto: CreateSpaceDto, @User() user: any) {
    return this.spaceService.creaeteSpace(createSpaceDto, user.userId);
  }
}
