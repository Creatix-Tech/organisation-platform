import { IsEmail, IsString, MinLength, MaxLength, IsNumber, Min, Max, Matches } from "class-validator";


import { constants } from "src/common/constants/validation.constants";

export class UserDto {
    @IsEmail()
    email!: string;

    @Matches(constants.emailPattern, {
        message: constants.invalidEmailMessage
    })
    password!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(16)
    name!: string;

    @IsNumber()
    @Min(17)
    @Max(99)
    age!: number;

    isAdmin?: boolean = false;
}