import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs'
//TODO MAKE IT A NEST MIDDLEWARE
import { graphqlUploadExpress } from 'graphql-upload';
async function bootstrap() {
  // const keyFile = fs.readFileSync(__dirname + (process.env.NODE_ENV === 'production' ? '/../../../../ssl/localhost.key' : '/../../ssl/localhost.key'));
  // const certFile = fs.readFileSync(__dirname + (process.env.NODE_ENV === 'production' ? '/../../../../ssl/localhost.crt' : '/../../ssl/localhost.crt'));
  const app = await NestFactory.create(AppModule, {
    // httpsOptions: {
    //   key: keyFile,
    //   cert: certFile,
    // }
  });
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),)
  await app.listen(process.env.PORT);
}
bootstrap();
