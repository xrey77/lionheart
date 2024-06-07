import { IsOptional, IsString } from "class-validator";

export class UpdateInfodto {

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