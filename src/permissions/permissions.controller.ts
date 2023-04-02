import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreatePermissionDto } from './dto/create-permission-dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private PermissionsService: PermissionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('new')
  newPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.PermissionsService.newPermission(createPermissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  addPermission(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    return this.PermissionsService.addPermissionToRole(id, name);
  }
}
