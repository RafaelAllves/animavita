import { Controller, Get, Query } from '@nestjs/common';
import { OpenCageService } from '../frameworks/opencage.service';

@Controller('api/v1/location')
export class GeolocationController {
  constructor(private readonly geolocationService: OpenCageService) {}

  @Get()
  async reverseGeocoding(@Query('latitude') latitude: string, @Query('longitude') longitude: string): Promise<any> {
    return this.geolocationService.reverseGeocoding(latitude, longitude);
  }
}
