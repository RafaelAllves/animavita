import * as https from 'https';

export class OpenCageService {
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
            resolve(parsedData.results.map(address => {
              if (address.components.continent == "Europe") {
                return {
                  region: address.components.municipality,
                  subregion: address.components.county,
                }
              } else {
                return {
                  region: address.components.city,
                  subregion: address.components.state,
                }
              }
            }));
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
