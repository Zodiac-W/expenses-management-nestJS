import { SpaceUser } from 'src/space/entities/spaceUser.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  user_email: string;

  @Column()
  user_phone: string;

  @Column()
  user_pass: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.REGULAR_USER })
  user_role: UserRole;

  @Column({ type: 'date', nullable: true })
  user_expiration: Date;

  @Column({ type: 'integer', nullable: true })
  user_total_transactions: number;

  @Column({ type: 'integer', nullable: true })
  user_spaces: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  user_is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => SpaceUser, (spaceUser) => spaceUser.user)
  spaceUser: SpaceUser[];
}
