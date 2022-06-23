import { IsEmail, IsString, MinLength, MaxLength, IsNumber, Min, Max, Matches } from "class-validator";

export class UserDto {
    @IsEmail()
    email!: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
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