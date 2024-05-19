import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userschema } from 'src/schemas/User.shema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),        
        JwtModule.register({
            secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InJleW5hbGRtYXJxdWV6Z3JhZ2FzaW4iLCJpYXQiOjE1MTYyMzkwMjJ9.1YzOp6M9JBoUc3RBz0xFTGTsQPuLq7UQDYcI7oxTkWQ',
            signOptions: { expiresIn: '1d' }
        }),
        MongooseModule.forFeature([{
            name: User.name,
            schema: userschema,
        },
    ]),

    ],
    controllers: [UsersController],
    providers: [UsersService, JwtService],
    exports: [UsersService, JwtModule]
})
export class UsersModule {}
