import { Module } from '@nestjs/common';
import { GeolocationController } from './geolocation.controller';
import { OpenCageService } from '../frameworks/opencage.service';
import { GeolocationService } from './geolocation.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GeolocationController],
  providers: [OpenCageService],
})
export class GeolocationModule {}