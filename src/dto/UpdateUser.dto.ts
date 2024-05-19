import { IsOptional, IsString } from "class-validator";

export class UpdateUserdto {    

    @IsOptional()
    @IsString()
    mobileno?: string;

    @IsOptional()
    @IsString()
    profilepic?: string;
}