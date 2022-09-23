import 'reflect-metadata';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'db_marketplace',
  migrationsTableName: 'migrations',
  synchronize: true,
  logging: false,
  entities: ['src/data/entity/**/*.ts'],
  migrations: ['src/data/migration/**/*.ts'],
  subscribers: ['src/data/subscriber/**/*.ts'],
};

export default config;
