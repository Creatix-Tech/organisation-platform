import { Roles } from "./roles.enumt";
import { OrganizationKey } from "src/organization/organization.interface";

export interface UserKey {
    id: string;
}

export interface User extends UserKey {
    email: string;
    password: string;
    name: string;
    age: number;
    role: Roles;
    orgList: OrganizationKey[];
}