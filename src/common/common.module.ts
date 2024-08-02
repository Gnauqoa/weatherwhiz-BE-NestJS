import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SwaggerModule } from './swagger/swagger.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [DatabaseModule, SwaggerModule, MailerModule],
})
export class CommonModule {}
