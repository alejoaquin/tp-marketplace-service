import 'reflect-metadata';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'admin123',
    database: 'db_marketplace',
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: false,
    entities: ['dist/domain/entities/*.entity.{ts,js}'],
    migrations: ['dist/domain/migration/*.js'],
    subscribers: ['dist/domain/subscriber/*.js'],
};

export default config;
