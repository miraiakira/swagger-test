import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The API descrtiption')
    .setVersion('1.0')
    .addTag('test')
    .addBasicAuth({
      type: 'http',
      name: 'basic',
      description: '用户名 + 密码',
    })
    .addCookieAuth('sid', {
      type: 'apiKey',
      name: 'session-id',
      description: '基于 cookie 的认证',
    })
    .addBearerAuth({
      name: 'bearer',
      type: 'http',
      description: '基于 jwt 的认证',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(5000);
}
bootstrap();
