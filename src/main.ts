import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  // app.useGlobalPipes(new ValidationPipe());  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  
  app.useStaticAssets(join(__dirname, '..', '../public'));  
  app.enableCors();
  app.setGlobalPrefix('api')
  app.use(compression());

  await app.listen(4000);
}
bootstrap();
