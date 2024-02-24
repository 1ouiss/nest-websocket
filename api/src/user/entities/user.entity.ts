import { TimestampEntites } from '../../Generic/timestamp.entites';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  // @Column({
  //   type: 'enum',
  //   enum: ROLES_ENUM,
  // })
  // role: ROLES_ENUM;
}
