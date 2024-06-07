import { InjectModel} from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.shema';
import { UpdateUserdto } from 'src/dto/UpdateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    
    constructor(
        // private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>){}

    findAll() {
        return this.userModel.find();
    }

    findUserid(id: string) {
        return this.userModel.findById(id)
    }    

    async updateUser(id: string, updateUserDto: UpdateUserdto) {
        if (updateUserDto.password !== undefined) {
            const saltOrRounds = 10;
            const password = updateUserDto.password;
            const hash = await bcrypt.hash(password, saltOrRounds);
            updateUserDto.password = hash;                
        } 

        const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!existingUser) {
          throw new NotFoundException(`User #${id} not found`);
        }
        return existingUser;
        // return this.userModel.updateOne(updateUserDto)
    }
 
    deleteUser(id: string) {
        return this.userModel.findById(id).deleteOne();
    }    
}
