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
    entities: ['src/domain/entities/**/*.entity.ts'],
    migrations: ['src/configuration/migrations/**/*.ts'],
    subscribers: ['src/data/subscriber/**/*.ts'],
};

export default config;
