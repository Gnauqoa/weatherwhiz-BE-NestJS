import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { CurrentWeatherService } from './weather/current-weather.service';
import { MailerService } from './common/mailer/mailer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly logger = new Logger(AppService.name),
    private prisma: PrismaService,
    private currentWeatherService: CurrentWeatherService,
    private mailerService: MailerService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async sendWeatherDataEmail() {
    this.logger.log('Weather data email');
    const users = await this.prisma.user.findMany({
      where: {
        notification_each_day: true,
        verified: true,
      },
    });
    console.log({ users });
    Promise.all(
      users.map(async (user) => {
        const currentWeather =
          await this.currentWeatherService.getCurrentWeather({
            q: user.location_query,
            location_id: user.location_id,
          });
        await this.mailerService.sendCurrentWeatherEmail({
          to: user.email,
          fullName: user.first_name + ' ' + user.last_name,
          day: currentWeather.forecast.forecastday[0].day,
          location_query: user.location_query,
        });
      }),
    );
    return { message: 'Sent email weather success' };
  }
}
