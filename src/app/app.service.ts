import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {mergeAll, share} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  config() {
    return this.http.get<any>('assets/config.json').pipe(
      // mergeAll(),
      share()
    );
  }
}
