import { InjectModel} from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.shema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>){}

    async findUsername(usrname: string, pwd: string) {
        const userx = await this.userModel.find({username: usrname});   

        if (!userx[0]) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);  

        // compare passwords    
        const areEqual = await bcrypt.compare(pwd, userx[0].password);    
        if (!areEqual) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        
        const payload = {"sub": userx[0].username, "name": userx[0].lastname};  
        return {
            userid:userx[0].id,
            username: userx[0].username,
            lastname: userx[0].lastname,
            firstname: userx[0].firstname,
            emailadd: userx[0].emailadd,
            profilepic: userx[0].profilepic,
            token: await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRE }),
           }        
    }


    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        const saltOrRounds = 10;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        newUser.password = hash;
        return newUser.save();
    }    


}
