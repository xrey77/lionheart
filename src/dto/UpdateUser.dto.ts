import { IsOptional, IsString } from "class-validator";
import { Timestamp } from "rxjs";

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