import { Component, OnInit } from '@angular/core';

import { Request, Response } from '../models';
import { HyperledgerService } from '../hyperledger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  responsesA: Response;
  responsesB: Response;

  constructor(private service:HyperledgerService) { }

  ngOnInit() {
    this.getTxA();
    this.getTxB();
  }

  getTxA(): void {
    this.service.getTx('a')
    .subscribe(response => this.responsesA = response,
    err => console.log(err));
  }

  getTxB(): void {
    this.service.getTx('b')
    .subscribe(response => this.responsesB = response,
    err => console.log(err));
  }


}
