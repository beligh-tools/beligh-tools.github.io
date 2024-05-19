import {Component, effect, inject, WritableSignal} from '@angular/core';
import {JsonPipe} from '@angular/common';

import {
  VisAxisModule, VisBulletLegendModule,
  VisDonutModule,
  VisLineModule,
  VisScatterModule,
  VisSingleContainerModule, VisStackedBarModule, VisTimelineModule,
  VisTooltipModule,
  VisXYContainerModule
} from '@unovis/angular';

import {WeatherService, dayjs} from '../../services';

import {BulletLegendItemInterface} from '@unovis/ts';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

type DataRecord = {
  x: number;
  yAvgTemp: number;
  yMinTemp: number;
  yMaxTemp: number;
  yPrecipitationMM: number;
};

type DataRecordValues = {
  yAvgTemp: number;
  yMinTemp: number;
  yMaxTemp: number;
  yPrecipitationMM: number;
};

type DataLabels = {
  [k in keyof DataRecordValues]: string;
};

export const labels: DataLabels = {
  yAvgTemp: 'Avg temp',
  yMinTemp: 'Min temp',
  yMaxTemp: 'Max temp',
  yPrecipitationMM:  'Precipitation mm',
}

export enum DataLabelsType {
  AVG_TEMP = 'yAvgTemp',
  MIN_TEMP = 'yMinTemp',
  MAX_TEMP = 'yMaxTemp',
  PRECIPITATION_MM = 'yPrecipitationMM',
}

@Component({
  selector: 'app-weather-chart',
  standalone: true,
  imports: [
    VisSingleContainerModule,
    VisTooltipModule,
    VisDonutModule,
    VisScatterModule,
    VisLineModule,
    VisAxisModule,
    VisXYContainerModule,
    VisStackedBarModule,
    VisTimelineModule,
    VisBulletLegendModule,
    JsonPipe,

    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './weather-chart.component.html',
  styles: [`
    .custom-vis {
      --vis-scatter-fill-opacity: 0.2;
      --vis-scatter-stroke-width: 1;
      --vis-scatter-hover-stroke-width: 2;
      --vis-scatter-point-label-text-color-dark: darkblue;
    }
  `]
})
export class WeatherChartComponent {
  private readonly weatherService: WeatherService =  inject(WeatherService);
  currentPosition: WritableSignal<string> = this.weatherService.currentPosition;

  x = (d: DataRecord): number => Number(dayjs.unix(d.x).format('YYYY'));

  y = [
    (d: DataRecord): number => d.yAvgTemp,
    (d: DataRecord): number => d.yMinTemp,
    (d: DataRecord): number => d.yMaxTemp,
    (d: DataRecord): number => d.yPrecipitationMM,
  ];

  legendItems: BulletLegendItemInterface[] = [
    DataLabelsType.AVG_TEMP,
    DataLabelsType.MAX_TEMP,
    DataLabelsType.MIN_TEMP,
    DataLabelsType.PRECIPITATION_MM
  ].map(
    (name: any) => ({
      // @ts-ignore
      name: labels[name],
    })
  );

  graphData: DataRecord[] = [];

  constructor() {
    effect(() => {
      this.updateData(this.currentPosition());
    });
  }

  private updateData(country: string) {
    this.weatherService.getCountryData(country).then((data: any) => {
      this.graphData = [];
      data[0]?.values.forEach((value: any) => {
        this.graphData = [...this.graphData, this.mapDataRecord(value)];
      });
    });
  }

  private mapDataRecord(value: any): DataRecord {
    return {
      x: dayjs(value[1]).unix(),
      yAvgTemp: value[2],
      yMinTemp: value[3],
      yMaxTemp: value[4],
      yPrecipitationMM: value[5],
    };
  }

  loadAllHistoricData() {
    this.updateData(this.currentPosition());
  }
}
