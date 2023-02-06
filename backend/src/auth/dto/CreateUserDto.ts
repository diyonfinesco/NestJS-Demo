import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsOptional()
    role: string;
}