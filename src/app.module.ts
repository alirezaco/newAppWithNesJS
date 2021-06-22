import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from 'src/config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot(typeOrmModuleConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
