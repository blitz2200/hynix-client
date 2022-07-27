import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-chart',
  templateUrl: './example-chart.component.html',
  styleUrls: ['./example-chart.component.scss']
})
export class ExampleChartComponent implements OnInit {

  @ViewChild()
  constructor() { }

  ngOnInit(): void {
  }

}
