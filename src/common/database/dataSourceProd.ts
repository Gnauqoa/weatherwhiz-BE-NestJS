import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const connectionOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432, // Don't forget to cast to number with +
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['/dist/common/database/entities/*.entity{.ts,.js}'], // where our entities reside
  migrations: ['/dist/common/database/migrations/*{.ts,.js}'], // where our migrations reside
};

export default connectionOptions;
