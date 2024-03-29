interface ReversedGeocodingOutput {
  region: string;
  subregion: string;
}

export abstract class GeolocationService {
  public abstract reverseGeocoding(
    latitude: string,
    longitude: string,
  ): Promise<ReversedGeocodingOutput>;
}