import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant-dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private userService: UsersService,
  ) {}

  async createTenant(
    createTenantDto: CreateTenantDto,
    userId: number,
  ): Promise<any> {
    const { tenant_name, tenant_maxRegularusers } = createTenantDto;

    const tenant = new Tenant();

    tenant.tenant_name = tenant_name;
    tenant.tenant_maxRegularusers = tenant_maxRegularusers;

    await this.userService.assignUserToTenant(userId, tenant);
    await this.tenantRepository.save(tenant);

    return tenant;
  }

  async addRegularuserToTenant(userId: number, tenantId: number): Promise<any> {
    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId },
    });

    const user = await this.userService.assignUserToTenant(userId, tenant);
    tenant.tenant_maxRegularusers--;
    await this.tenantRepository.save(tenant);
    return user;
  }

  async getAllTenants(): Promise<any> {
    const tenants = await this.tenantRepository.find();

    return tenants;
  }

  async getTenant(id: number): Promise<any> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });

    return tenant;
  }
}
