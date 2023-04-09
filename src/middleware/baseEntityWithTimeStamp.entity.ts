import { BaseEntity, CreateDateColumn } from 'typeorm';

export abstract class BaseEntityWithTimestamps extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;
}
