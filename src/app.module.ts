import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerService } from './common/mailer/mailer.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CommonModule,
    WeatherModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, Object, MailerService],
})
export class AppModule {}
