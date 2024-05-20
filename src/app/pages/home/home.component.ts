import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppService} from "../../app.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {VisGraphModule, VisSingleContainerModule} from "@unovis/angular";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    VisGraphModule,
    VisSingleContainerModule,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly appService: AppService = inject(AppService);

  config: any;

  ngOnInit(): void {
     this.appService.config().subscribe({
      next: (config) => {
        this.config = config;
      }
     });
  }

}
