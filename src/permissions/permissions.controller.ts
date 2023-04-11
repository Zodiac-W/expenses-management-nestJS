import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreatePermissionDto } from './dto/create-permission-dto';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
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

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllPermissions() {
    return this.PermissionsService.getAllPermission();
  }
}
