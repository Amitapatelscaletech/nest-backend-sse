import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShowSubscribers {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  id: string;

  @Column({
    nullable: false,
    default: '',
    name: 'show_id'
  })
  show_id: string;

  @Column({
    nullable: false,
    default: '',
    name: 'user_id'
  })
  user_id: string;
}