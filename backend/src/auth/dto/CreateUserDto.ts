import { IsEmail, IsNotEmpty, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    readonly password: string;

    @IsOptional()
    readonly role: string;
}