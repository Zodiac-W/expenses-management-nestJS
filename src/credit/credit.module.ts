import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { Credit } from './entities/credit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credit])],
  controllers: [CreditController],
  providers: [CreditService],
  exports: [CreditService],
})
export class CreditModule {}
