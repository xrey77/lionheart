import { IsOptional, IsString } from "class-validator";

export class UpdateUserdto {    

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    mobileno?: string;

    @IsOptional()
    @IsString()
    profilepic?: string;
}