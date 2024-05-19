import {Component, inject, OnInit} from '@angular/core';
import {ExpansesService} from "./expanses.service";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  private expansesService: ExpansesService =  inject(ExpansesService);

  constructor() {

  }

  ngOnInit() {

  }

}
