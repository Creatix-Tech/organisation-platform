import { ManyToMany, Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import * as bcrypt from 'bcrypt';


import { Organization } from 'src/organization/organization.entity';
import { Roles } from './roles.enumt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    role: Roles

    @ManyToMany(() => Organization, (org: Organization) => org.members)
    orgList: Organization[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}