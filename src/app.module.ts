import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { InfoModule } from './info/info.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    AuthModule,
    InfoModule,
    MulterModule.register({dest: './public/images'})
    // ThrottlerModule.forRoot([
    // {
    //   name: 'short',
    //   ttl: 1000,
    //   limit: 3,
    // },{
    //   name: 'long',
    //   ttl: 60000,
    //   limit: 100
    // }])
    ],
  controllers: [],
  // providers: [{
    // provide: APP_GUARD,
    // useClass: ThrottlerGuard
  // }],
})
export class AppModule {}

