import { Module } from '@nestjs/common';
import { GeolocationController } from './geolocation.controller';
import { OpenCageService } from '../frameworks/opencage.service';

@Module({
  controllers: [GeolocationController],
  providers: [OpenCageService],
})
export class GeolocationModule {}