import { IsEmail, Matches } from "class-validator";


import { constants } from "src/common/constants/validation.constants";

export class LoginUserDto {
    @IsEmail()
    username!: string;

    @Matches(constants.passwordPattern, {
        message: constants.invalidPasswordMessage
    })
    password!: string;
}