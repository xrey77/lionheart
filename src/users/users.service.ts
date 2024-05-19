import { InjectModel} from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.shema';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserdto } from 'src/dto/UpdateUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>){}

    private users = [
        {
            "id": 1,
            "name": "Reynald",
            "email": "reynald@yahoo.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Jigoro",
            "email": "jigoro@live.com",
            "role": "USER"            
        },
        {
            "id": 3,
            "name": "Soji",
            "email": "soji@gmail.com",
            "role": "SUPERVISOR"
        }
    ]

    // findAll(role?: 'USER' | 'SUPERVISOR' | 'ADMIN') {
    //     if (role) {
    //         return this.users.filter(user => user.role === role)
    //     }
    //     return this.users
    // }    
    findAll() {
        return this.userModel.find();
    }

    // findOne(id: number) {
    //     const user = this.users.find(user => user.id === id)
    //     return user
    // }    
    findUserid(id: string) {
        return this.userModel.findById(id)
    }    

   async findUsername(usrname: string, pwd: string) {
        const userx = await this.userModel.find({username: usrname});   

        if (!userx[0]) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);  

        // compare passwords    
        const areEqual = await bcrypt.compare(pwd, userx[0].password);    
        if (!areEqual) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        
        const payload = {"sub": userx[0].id, "name": userx[0].username};  
        // let token =  this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET});
        return {
            username: userx[0].username,
            lastname: userx[0].lastname,
            firstname: userx[0].firstname,
            emailadd: userx[0].emailadd,
            profilepic: userx[0].profilepic,
            token: await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET}),
           }        
        // return { username: userx[0].username, password: userx[0].password}
    }

 
    // createUser(user: {name: string, email: string, role: 'USER' | 'SUPERVISOR' | 'ADMIN'}) {
    //     const maxId = [...this.users].sort((a,b) => b.id - a.id)
    //     const newUser = {
    //         id: maxId[0].id + 1,
    //         ...user
    //     }
    //     this.users.push(newUser)
    //     return newUser
    // }    

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        const saltOrRounds = 10;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        newUser.password = hash;
        return newUser.save();
    }    

    updateUser(updateUserDto: UpdateUserdto) {
        return this.userModel.updateOne(updateUserDto)
    }
 
    // updateUser(id: number, updatedUser: { name?: string , email?: string, role?:  'USER' | 'SUPERVISOR' | 'ADMIN'}) {
    //    this.users = this.users.map(user => {
    //     if (user.id === id) {
    //         return { ...user, ...updatedUser}
    //     }
    //     return user
    //    } )
    // //    return this.findOne()
    // }

    deleteUser(id: string) {
        // const removedUser = this.findOne(id)
        // this.users = this.users.filter(user => user.id !== id)      
        return this.userModel.findById(id).deleteOne();
    }    
}
