import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { SendVerificationEmailDto } from './send-verification-email.dto';
import { DayDto } from 'src/weather/dto/forecast.dto';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendCurrentWeatherEmail(payload: {
    day: DayDto;
    to: string;
    fullName: string;
    location_query: string;
  }) {
    try {
      await this.mailerService.sendMail({
        to: payload.to,
        subject: 'Current Weather Today', // Subject line
        context: {
          fullName: payload.fullName,
          day: payload.day,
          location_query: payload.location_query,
        },
        template: 'current-weather',
      });
    } catch (err) {
      console.error('Error sending email: ');
      return 'Skip failed email';
    }
  }
  async sendVerificationMail(payload: SendVerificationEmailDto) {
    try {
      console.log('Sending email to: ', payload.to);
      await this.mailerService.sendMail({
        to: payload.to,
        subject: payload.subject, // Subject line
        context: {
          fullName: payload.fullName,
          FE_URL: payload.FE_URL,
          verificationCode: payload.verificationCode,
          userId: payload.userId,
        },
        template: 'verification',
      });
      return {
        success: true,
      };
    } catch (error) {
      console.error('Error sending email: ');
      throw new InternalServerErrorException(error);
    }
  }
}
