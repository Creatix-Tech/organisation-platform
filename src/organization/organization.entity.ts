import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, AfterInsert, AfterLoad, AfterUpdate } from 'typeorm'

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