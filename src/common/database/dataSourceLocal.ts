import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const connectionOptions: TypeOrmModuleOptions = {
  type: 'postgres', // It could be mysql, mongo, etc
  host: 'localhost',
  port: 5432,
  username: 'quang', // postgre username
  password: 'quang', // postgre password
  database: 'weather_whiz_service', // postgre db, needs to be created before
  synchronize: false, // if true, you don't really need migrations
  logging: true,
  entities: ['/src/common/database/entities/*.entity{.ts,.js}'], // where our entities reside
  migrations: ['/src/common/database/migrations/*{.ts,.js}'], // where our migrations reside
};

export default connectionOptions;
