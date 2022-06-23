import { IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/user/user.entity";

export class OrganizationDto {
    @IsString()
    @MinLength(1)
    @MaxLength(16)
    name!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    description!: string;

    members: User[] = [];
}