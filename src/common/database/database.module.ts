import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import DataSourceProd from './dataSourceProd';
import DataSourceLocal from './dataSourceLocal';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.getOrThrow('NODE_ENV') === 'production'
          ? DataSourceProd
          : DataSourceLocal;
      },

      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
