import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('FleetLogic API')
    .setDescription('API de gestão de frotas e telemetria IoT em tempo real.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token', 
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: `${configService.getOrThrow<string>(
        'MQTT_BROKER_URL')}:${configService.getOrThrow<number>('MQTT_BROKER_PORT')}`,
    },
  });

  await app.startAllMicroservices();

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application 'FleetLogic' is running on: http://localhost:${port}/api/v1`);
  console.log(`Swagger disponível em http://localhost:${port}/api/docs`);
  
  console.log(`MQTT conectado ao Broker em ${configService.get('MQTT_BROKER_URL')}`)
}
bootstrap();
