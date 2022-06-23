import { IsEmail, Matches } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    username!: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    })
    password!: string;
}