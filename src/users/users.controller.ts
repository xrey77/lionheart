import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, 
    UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserdto } from 'src/dto/UpdateUser.dto';
import { LoginUserDto } from 'src/dto/LoginUser.dto';

@Controller('users')
export class UsersController {

    constructor(        
        private readonly usersService: UsersService) {}

    @Get()  // GET /users
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id') // GET /users/:id
    async findOne(@Param('id') id: string) {
        const isIdValid = mongoose.Types.ObjectId.isValid(id);
        if (!isIdValid) throw new HttpException('User not found', 404);
        return await this.usersService.findUserid(id)
    }

    @Post('/signin')
    async signIn(@Body() loginUserDto: LoginUserDto) {
       return await this.usersService.findUsername(loginUserDto.username, loginUserDto.password)
    }

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
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


