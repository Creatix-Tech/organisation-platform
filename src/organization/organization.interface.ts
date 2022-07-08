import { User, UserKey } from "src/user/user.interface";

export interface OrganizationKey {
    id: string;
}

export interface Organization extends OrganizationKey {
    name: string;
    description: string;
    members: User[];
}