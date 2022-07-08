import { IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";


import { constants } from "src/common/constants/validation.constants";

export class UpdateUserDto {
    @Matches(constants.passwordPattern, {
        message: constants.invalidPasswordMessage
    })
    @IsOptional()
    password: string;


    @IsString()
    @MinLength(1)
    @MaxLength(16)
    @IsOptional()
    name: string;
}