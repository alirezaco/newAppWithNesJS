/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
  database: 'tasks',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  autoLoadEntities: true,
};
