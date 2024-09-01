import { IsEmail, IsString, Matches, MinLength } from "class-validator";


export class registerUserDto{
    @IsEmail()
    email: string;

    @MinLength(8, {
        message: "The password must contain at least 8 characters"
    })
    @IsString()
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one letter, one number, and one special character.',
    })
    password: string;
}