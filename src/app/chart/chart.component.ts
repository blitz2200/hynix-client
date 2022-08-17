import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getResult().subscribe(result=> {
      console.log(' result : ', result);
      // this.barChartData.datasets.push({label: 'Q'+result?.index, data: [result?.processingTime!]});

        this.barChartData.datasets[result?.index!].data.push(Number(result?.processingTime!.toFixed(2)));
      this.chart?.update();

    });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      gridLines: {
        display: false,
      },
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart - Stacked'
      // },
      legend: {
        display: false,
      },
      datalabels: {
        formatter: function (value, context) {
          // return context.dataset.label + '  (' + value + ')';
          // return context.dataset.label + '\n' + value;
          return context.dataset.label;
        },
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  public barChartData: ChartData<'bar'> = {
    labels: ['DRAM only', 'DRAM & CXL Mem', 'DRAM &CXL Mem w/ NDP', 'DRAM &{CXL Mem w/ NDP}x2'],
    datasets: [
      { label: 'Q1', data: [5, 4, 3],}, {label: 'Q2', data: [5, 4, 3],},
      {label: 'Q3', data: [5, 4, 3],}, {label: 'Q4', data: [5, 4, 3],},
      {label: 'Q5', data: [5, 4, 3],}, {label: 'Q6', data: [5, 4, 3],},
      {label: 'Q7', data: [5, 4, 3],}, {label: 'Q8', data: [5, 4, 3],},
      {label: 'Q9', data: [5, 4, 3],}
    ],
  };

  // events
  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
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

