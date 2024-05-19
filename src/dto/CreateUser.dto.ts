import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    emailadd: string;

    @IsString()
    mobileno?: string;

    @IsString()
    role: string;

    @IsOptional()
    @IsString()
    profilepic?: string;

}