import { IsEmail } from "class-validator";
import { IsString, MaxLength, MinLength } from "class-validator";

export class UserOfOrg {
    @IsString()
    @MinLength(1)
    @MaxLength(16)
    orgName!: string;

    @IsEmail()
    uEmail!: string
}