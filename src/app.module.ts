import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BuilderModule } from './builder/builder.module';
import { ProjectsModule } from './projects/projects.module';
import { EmailFormModule } from './emailform/emailform.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mannethainfra:TuCfkyed1XcdvyhC@cluster0.jtqwois.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    
    // ServeStaticModule configuration to serve static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Directory where your static files are stored
      serveRoot: '/uploads', // URL path prefix for accessing static files
    }),

    UserModule,
    AuthModule,
    BuilderModule,
    ProjectsModule,
    EmailFormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
