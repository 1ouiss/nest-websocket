import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TimestampEntites {
  @CreateDateColumn({
    type: 'timestamp with time zone',
    update: false,
    // default: new Date()
    default: () => 'NOW()',
    // timeZone: 'Europe/Paris',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
  })
  deletedAt: Date;
}
