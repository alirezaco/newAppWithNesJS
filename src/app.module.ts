import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, UserModule, TypeOrmModule.forRoot(typeOrmModuleConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
