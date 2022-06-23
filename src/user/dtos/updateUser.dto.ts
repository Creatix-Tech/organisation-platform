import { IsString, MinLength, MaxLength, Matches } from "class-validator";


import { constants } from "src/common/constants/validation.constants";

export class UpdateUserDto {
    @Matches(constants.emailPattern, {
        message: constants.invalidEmailMessage
    })
    password?: string;


    @IsString()
    @MinLength(1)
    @MaxLength(16)
    name?: string;
}