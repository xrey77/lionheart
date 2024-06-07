import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateInfodto } from 'src/dto/UpdateInfo.dto';
import { Model } from 'mongoose';
import { InjectModel} from '@nestjs/mongoose';
import { User } from 'src/schemas/User.shema';

@Injectable()
export class InfoService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>){}
    
    async updateInfo(updateInfoDto: UpdateInfodto) {
        if (updateInfoDto.password !== undefined) {
            const saltOrRounds = 10;
            const password = updateInfoDto.password;
            const hash = await bcrypt.hash(password, saltOrRounds);
            updateInfoDto.password = hash;                
        } 
        return this.userModel.updateOne(updateInfoDto)
    }

    async updateProfilepic(id: any, updateInfoDto: UpdateInfodto) { 
        const existingUser = await this.userModel.findByIdAndUpdate(id.id, updateInfoDto, { new: true });
        if (!existingUser) {
          throw new NotFoundException(`User #${id} not found`);
        }
        
        return existingUser;

    }


    activateOTP(ok: boolean) {
        return
    }
}
