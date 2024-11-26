// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as mongoose from 'mongoose';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());

//   app.enableCors({
//     // origin: 'http://localhost:3002', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   await app.listen(5000);
// }
// bootstrap();

// mongoose.connection.on('error', err => {
//   console.error('MongoDB connection error:', err);
// });


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser'; // Import body-parser

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Add body-parser middleware
  app.use(bodyParser.json()); // Parses JSON bodies
  app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies

  await app.listen(5001);
}
bootstrap();

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
