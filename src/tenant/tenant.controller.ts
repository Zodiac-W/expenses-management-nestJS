import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { CreateTenantDto } from './dto/create-tenant-dto';
import { Superuser } from './guards/superuser.guard';
import { TenantService } from './tenant.service';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @ApiOperation({ summary: 'Get all tenants' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'All the Tenants',
    type: [CreateTenantDto],
  })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllTenants() {
    return this.tenantService.getAllTenants();
  }

  @ApiOperation({ summary: 'Get single tenant' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'integer', description: 'ID of the tenant' })
  @ApiResponse({
    status: 200,
    description: 'Get one tenant by ID',
    type: CreateTenantDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTenant(@Param('id', ParseIntPipe) id: number) {
    return this.tenantService.getTenant(id);
  }

  @ApiOperation({ summary: 'Create new tenant' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'New Tenant',
    type: CreateTenantDto,
  })
  @UseGuards(JwtAuthGuard, Superuser)
  @Post('/new')
  createTenant(@Body() createTenantDto: CreateTenantDto, @User() user: any) {
    return this.tenantService.createTenant(createTenantDto, user.userId);
  }

  @ApiOperation({ summary: 'Add user to tenant' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'New user to a tenant',
    type: CreateUserDto,
  })
  @UseGuards(JwtAuthGuard)
  @Put('/add/:id')
  addRegularuserToTenant(
    @Param('id', ParseIntPipe) id: number,
    @User() user: any,
  ) {
    return this.tenantService.addRegularuserToTenant(user.userId, id);
  }
}
