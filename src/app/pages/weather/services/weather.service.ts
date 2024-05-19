import {Injectable, signal} from '@angular/core';

import {feature} from '@rapideditor/country-coder';
import {getCountryData, getDailyCountryData, allCountries, Dayjs } from '.';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  currentPosition = signal('United States of America');

  constructor() { }

  getCurrentPosition() {
     navigator?.geolocation?.getCurrentPosition(async (value) => {
      const locationBasedLocation = feature([value.coords.longitude, value.coords.latitude])?.properties?.nameEn;
      if (locationBasedLocation && allCountries?.includes(locationBasedLocation)) {
        this.currentPosition.set(locationBasedLocation) ;
      }
    });

  }

  async getCountryData(country: string) {
    return getCountryData(country);
  }

  async getDailyCountryData(country: string, date: Dayjs) {
    return getDailyCountryData(country, date);
  }

  formatTemperature(temperature: number): string {
    return `${temperature?.toFixed(1)}°C`;
  }

  get allCountries() {
    return allCountries;
  }

}
