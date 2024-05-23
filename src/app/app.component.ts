import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {AppService} from './app.service';

import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, RouterLink, LayoutComponent, AsyncPipe, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent  implements OnInit {
  private readonly appService: AppService =  inject(AppService);
  appConfig$!: any;

  ngOnInit(): void {
    this.appConfig$ = this.appService.config();
  }

}
