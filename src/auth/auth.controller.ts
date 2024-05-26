import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/LoginUser.dto';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(        
        private readonly authService: AuthService) {}

    @Post('/signin')
    async signIn(@Body() loginUserDto: LoginUserDto) {
     try {
       let usrs = await this.authService.findUsername(loginUserDto.username, loginUserDto.password)
       if (usrs) {
        return {data: usrs, message: 'Access Granted', statusCode: 200}
       }
     } catch(error) {
        return {message: error.response, statusCode: error.status}
     }       
    }

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.authService.createUser(createUserDto)
        } catch(error) {
            return {message: "Duplicate key error found.", statusCode: 400}
        }
    }

}
