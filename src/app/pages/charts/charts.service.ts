import {inject, Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private readonly http: HttpClient =  inject(HttpClient);

  constructor() { }

  getChartData(name: string) {
   // return this.http.get('https://jsonplaceholder.typicode.com/posts');
    return this.http.get(`assets/charts/${name}.json`);
  }

}
