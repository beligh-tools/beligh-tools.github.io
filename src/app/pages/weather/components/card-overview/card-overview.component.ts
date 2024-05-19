import {Component, effect, inject, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {WeatherService, Dayjs} from '../../services';

@Component({
  selector: 'app-card-overview',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card-overview.component.html'
})
export class CardOverviewComponent {
  private weatherService: WeatherService =  inject(WeatherService);
  @Input() date!: Dayjs;
  dailyData: any = [];

  constructor() {
    effect(() => {
       this.updateData(this.weatherService.currentPosition(), this.date).then(() => {});
    });
  }

  async updateData(country: string, date: Dayjs) {
    this.dailyData = (await this.weatherService.getDailyCountryData(country, date))[0]?.values[0];
  }

  formatTemperature(temperature: number): string {
    return this.weatherService.formatTemperature(temperature);
  }

}
