import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, 
    UsePipes, ValidationPipe,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from 'src/dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserdto } from 'src/dto/UpdateUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { threadId } from 'worker_threads';
// import { LoginUserDto } from 'src/dto/LoginUser.dto';
// import { SkipThrottle, Throttle } from '@nestjs/throttler';

// IF YOU WANT TO SKIPT Throttle
// import { Throttle, SkipThrottle} from '@nestjs/throttler';
// @SkipThrottle()
@Controller('users')
export class UsersController {

    constructor(        
        private readonly usersService: UsersService) {}

    // @SkipThrottle({ default: false})
    @UseGuards(AuthGuard)    
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


