import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'

import { User } from 'src/user/user.entity';

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => User, (user: User) => user.orgList)
    @JoinTable()
    members: User[];
}