import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  
  app.setGlobalPrefix('api/v1');
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

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: `${configService.getOrThrow<string>(
        'MQTT_BROKER_URL',
      )}:${configService.getOrThrow<number>('MQTT_BROKER_PORT')}`,
    },
  });

  await app.startAllMicroservices();

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application 'FleetLogic' is running on: http://localhost:${port}/api/v1`);
  console.log(`MQTT conectado ao Broker em ${configService.get('MQTT_BROKER_URL')}`)
}
bootstrap();
