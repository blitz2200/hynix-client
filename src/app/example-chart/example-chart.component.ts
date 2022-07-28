import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-example-chart',
  templateUrl: './example-chart.component.html',
  styleUrls: ['./example-chart.component.scss']
})
export class ExampleChartComponent implements OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {
  }

  ngOnInit(): void {
  }

  public barChartOptions: ChartConfiguration['options'] = {
    // responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      gridLines: {
        display: false,
      },
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      legend: {
        display: false,
      },
      datalabels: {
        formatter: function (value, context) {
          return context.dataset.label + '  (' + value + ')';
        },
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  public barChartData: ChartData<'bar'> = {
    labels: ['Case A', 'Case B'],
    datasets: [
      {
        label: 'Q1',
        data: [10, 20],
      },
      {
        label: 'Q2',
        data: [15, 20],
      },
    ],
  };

  // events
  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  ngAfterViewInit(): void {
    var barChartData = this.barChartData
    // @ts-ignore
    var chart = this.chart?.chart;
    var index = 3;
    setInterval(function () {
      // updatedDataSet = [Math.random(), Math.random(), Math.random(), Math.random()];
      // updateBarGraph(barChart, 'Prediction', colouarray, updatedDataSet);
      console.log('barChartData.datasets', barChartData.datasets);
      barChartData.datasets.push({
        label: 'Q' + index,
        data: [15, 20,],
      });
      // @ts-ignore
      chart.update();
      index++;
    }, 3000);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData.datasets[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     Math.round(Math.random() * 100),
  //     56,
  //     Math.round(Math.random() * 100),
  //     40 ];
  //
  //   this.chart?.update();
  // }

}

