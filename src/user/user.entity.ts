import { Organization } from 'src/organization/organization.entity';
import { ManyToMany, JoinTable, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
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
}