import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, 
    UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserdto } from 'src/dto/UpdateUser.dto';
import { LoginUserDto } from 'src/dto/LoginUser.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

// IF YOU WANT TO SKIPT Throttle
// import { Throttle, SkipThrottle} from '@nestjs/throttler';
// @SkipThrottle()
@Controller('users')
export class UsersController {

    constructor(        
        private readonly usersService: UsersService) {}

    // @SkipThrottle({ default: false})
    @Get()  // GET /users
    findAll() {
        return this.usersService.findAll().sort('firstname')
    }

    // @Throttle({ short: { ttl: 1000, limit: 1}})
    @Get(':id') // GET /users/:id
    async findOne(@Param('id') id: string) {
        const isIdValid = mongoose.Types.ObjectId.isValid(id);
        if (!isIdValid) throw new HttpException('User not found', 404);
        return await this.usersService.findUserid(id)
    }

    @Post('/signin')
    async signIn(@Body() loginUserDto: LoginUserDto) {
     try {
       let usrs = await this.usersService.findUsername(loginUserDto.username, loginUserDto.password)
       if (usrs) {
        return {data: usrs, message: 'Access Granted', statusCode: 200}
       }
     } catch(error) {
        return {message: error.response, statusCode: error.status}
     }       
    }

    @Post('/signup')
    // @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.usersService.createUser(createUserDto)
        } catch(error) {
            return {message: "Duplicate key error found.", statusCode: 400}
        }
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserdto) {
        return this.usersService.updateUser(updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const isIdValid = mongoose.Types.ObjectId.isValid(id);
        if (!isIdValid) throw new HttpException('User not found', 404);
        return this.usersService.deleteUser(id)
    }

}


