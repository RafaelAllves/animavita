import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { GeolocationService } from 'src/geolocation/geolocation.service';

@Injectable()
export class OpenCageService extends GeolocationService {
  async reverseGeocoding(latitude: string, longitude: string): Promise<any> {
    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude must be provided.');
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGE_KEY}`;

    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          const parsedData = JSON.parse(data);
          if (parsedData && parsedData.results) {
            resolve(parsedData.results.map(address => ({
              region: address.components.city || address.components.municipality,
              subregion: address.components.state ||address.components.county,
            })));
          } else {
            reject(new Error('Failed to parse response data.'));
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }
}
