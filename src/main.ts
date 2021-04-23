import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('蔡蔡子的 NestJs')
    .setDescription('測試用的')
    .setVersion('1.0')
    .addTag('Tag')
    .build();
  const document = SwaggerModule.createDocument(app, config, {include: [ProductsModule]});
  SwaggerModule.setup('api', app, document);  
  await app.listen(3000);
}
bootstrap();
