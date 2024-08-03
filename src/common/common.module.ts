import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [SwaggerModule, MailerModule],
})
export class CommonModule {}
