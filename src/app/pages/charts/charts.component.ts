import {AfterContentInit, Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

import { GraphLayoutType } from '@unovis/ts'
import {NodeDatum, LinkDatum,} from './models/chart1.model';
import {DataRecord} from './models/chart2.model';

import {VisBulletLegendModule, VisDonutModule, VisGraphModule, VisSingleContainerModule} from '@unovis/angular';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemIcon, MatListItemTitle} from '@angular/material/list';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';

import {ChartsService} from './charts.service';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    VisSingleContainerModule, VisGraphModule,
    VisDonutModule, VisBulletLegendModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatLabel,
    MatList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatOption,
    MatSelect,
    NgForOf,
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit, AfterContentInit {
  private readonly chartsService: ChartsService = inject(ChartsService);

  // chart1
  data1: any= { nodes: [], links: [] };
  layoutType1 = GraphLayoutType.Dagre;
  nodeLabel1 = (n: NodeDatum): string => n.label;
  nodeShape1 = (n: NodeDatum): string => n.shape;
  nodeStroke1 = (l: LinkDatum): string => l.color;
  linkFlow1 = (l: LinkDatum): boolean => l.active;
  linkStroke1 = (l: LinkDatum): string => l.color;

   // chart2
  value2 = (d: DataRecord): number => d.value;
  data2: DataRecord[] = [];
  legendItems2: any;

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.loadChart1();
    this.loadChart2();
  }

  private loadChart1() {
    const chartNodesData1 = this.chartsService.getChartData('chart1_nodes');
    const chartLinksData1 = this.chartsService.getChartData('chart1_links');
    forkJoin([chartNodesData1, chartLinksData1]).subscribe({
      next: (data: any) => {
        this.data1 = { nodes: data[0], links: data[1] };
      }
    });
  }

  private loadChart2() {
    const chartData2 = this.chartsService.getChartData('chart2_data');
    chartData2.subscribe({
      next: (data: any) => {
        this.data2 = data;
        Object.entries(data).map(([_, value]) => ({
          // @ts-ignore
          name: value.key.charAt(0).toUpperCase() + value.key.slice(1),
        }));
      }
    });
  }

}
