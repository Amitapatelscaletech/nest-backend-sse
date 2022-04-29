import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vote {
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
        name: 'event_id'
    })
    event_id: string;

    @Column({
        nullable: false,
        default: '',
        name: 'user_id'
    })
    user_id: string;

    @Column({
        nullable: false,

        name: 'blast_energy',
        type: 'int'
    })
    blast_energy: number;
}