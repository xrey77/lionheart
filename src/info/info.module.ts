import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userschema } from 'src/schemas/User.shema';
import { ConfigModule } from '@nestjs/config';
import { InfoController } from './info.controller';

@Module({
    imports: [
      ConfigModule.forRoot(),        
      MongooseModule.forFeature([{
          name: User.name,
          schema: userschema,
      },
  ]),
  ],
  controllers: [InfoController],
  providers: [InfoService],
  exports: [InfoService]
})
export class InfoModule {


}
