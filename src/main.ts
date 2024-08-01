import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './common/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerService = app.get(SwaggerService);
  swaggerService.setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
