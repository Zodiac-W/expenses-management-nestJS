import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({
    example: 'code-garage',
    description: 'The tenant name',
    type: String,
  })
  @IsNotEmpty()
  @Length(4, 20)
  tenant_name: string;

  @ApiProperty({
    example: 5,
    description: 'The allowed number of users for this instance',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  tenant_maxRegularusers: number;
}
