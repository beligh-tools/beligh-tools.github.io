import {Component, effect, inject, OnInit, WritableSignal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';

import {WeatherService, dayjs } from './services';

import {CardOverviewComponent} from './components/card-overview/card-overview.component';
import {CardPreviewComponent} from './components/card-preview/card-preview.component';
import {WeatherChartComponent} from './components/weather-chart/weather-chart.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    CardOverviewComponent,
    CardPreviewComponent,
    WeatherChartComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatProgressBar,
  ],
  templateUrl: './weather.component.html',
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class WeatherComponent implements OnInit {
  private readonly weatherService: WeatherService =  inject(WeatherService);
  readonly dayjs = dayjs;
  readonly allCountries = this.weatherService.allCountries;
  data: any = { value: null };
  currentPosition: WritableSignal<string> = this.weatherService.currentPosition;
  currentPositionFromControl = new FormControl(this.currentPosition());

  constructor() {
    effect(() => {
      this.currentPositionFromControl.setValue(this.currentPosition());
    });

    this.currentPositionFromControl.valueChanges.subscribe((value) => {
      if(value) {
        this.currentPosition.set(value);
      }
    });

  }

  ngOnInit() {
    this.weatherService.getCurrentPosition();
  }

}
