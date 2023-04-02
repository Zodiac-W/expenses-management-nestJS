import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateRoleDto } from './dto/create-role-dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getRolePermissions(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getRolePermissions(id);
  }

  @Post('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }
}
