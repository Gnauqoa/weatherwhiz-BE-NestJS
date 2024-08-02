import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailerService } from './mailer.service';
import { join } from 'path';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          // For relay SMTP server set the host to smtp-relay.gmail.com
          // and for Gmail STMO server set it to smtp.gmail.com
          host: configService.get('MAIL_HOST'),
          // For SSL and TLS connection
          secure: false,
          port: 587,
          auth: {
            // Account gmail address
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: configService.get('MAIL_USER'),
        },
        template: {
          dir: join('templates'),
          adapter: new HandlebarsAdapter(), // or other adapter (e.g., Pug, EJS, etc.)
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MailerService],
  providers: [MailerService],
})
export class MailerModule {}
