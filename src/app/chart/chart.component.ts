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

  lastIndex = 9
  ngOnInit(): void {
    this.dataService.getResult().subscribe(result => {

      // 재 시작하기 전에 이전 초기화된데이터로 차트 업데이트
      if (result.index == 0) {
        // @ts-ignore
        this.chart!.chart!.options!.scales!['y']!.ticks!.backdropColor = ['white','white','#0E306D'];
        this.chart!.chart!.options!.scales!['y']!.ticks!.color = ['#0E306D', '#0E306D', 'white'];
        // // @ts-ignore
        // this.chart!.options!.scales!['y']!.ticks!.backdropColor = 'black';
        // this.chart!.options!.scales!['y']!.ticks!.color = 'red';
        this.chart?.update();
      }

      this.barChartData.datasets[result?.index!].data.push(Number(result?.image?.processingTime!.toFixed(2)));
      this.chart?.update();

      // 마지막 데이터 없애기 차트는 다음 시작할때 업데이트함
      if (result.index == this.lastIndex) {
        // *2 *4 데이터 없데이트 하기
        for (let i = 0; i <= this.lastIndex; i++) {
          this.barChartData.datasets[i].data.push(0.8);
        }
        for (let i = 0; i <= this.lastIndex; i++) {
          this.barChartData.datasets[i].data.push(0.7);
        }
        this.chart?.update();
        for(let j=0; j<3; j++){
          for (let i = 0; i <= this.lastIndex; i++) {
            this.barChartData.datasets[i].data.pop();
          }
        }
      }

    });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 14,
        bottom: -24,
      }
    },
    indexAxis: 'y',
    scales: {
      gridLines: {
        display: false,
      },
      x: {
        stacked: true,
        grid: {
          borderWidth: 2.5,
          display: false
        },
        ticks: {
          color: 'white',
          font: {}
        }
      },
      y: {
        display: false,
        ticks: {
          showLabelBackdrop: true,
          // backdropColor:'black',
          color: '#0E306D',
          crossAlign: "far",
          font: {
            size: 12
          }
        },
        stacked: true,
        grid: {
          borderWidth: 1,
          display: false
        }
      }
    },
    plugins: {
      title: {
        padding: 0,
        display: false,
        position: 'bottom',
        text: 'Execution Time',
        color: '#0E306D',
        font: {
          size: 14,
          weight: 'bold',
          family: '나눔스퀘어'
        }
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: 'white',
        font: {
          size: 14,
          weight: 'bolder',
          family: '나눔스퀘어'
        },
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
    labels: ['DRAM only', 'DRAM & CXL Mem', 'DRAM &CXL Mem w/ NDP',
      'DRAM &{CXL Mem w/ NDP}x2', 'DRAM & [CXL Mem w/ NDP] x4'],
    datasets: [
      {
        label: 'Q1',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37)', 'rgba(245, 128, 37)', 'rgba(37, 120, 245)', 'rgba(245, 128, 37)', 'rgba(245, 128, 37)'],
      },
      {
        label: 'Q2',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.9)', 'rgba(245, 128, 37,0.9)', 'rgba(37, 120, 245, 0.9)', 'rgba(245, 128, 37,0.9)', 'rgba(245, 128, 37,0.9)',]
      },
      {
        label: 'Q3',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.8)', 'rgba(245, 128, 37,0.8)', 'rgba(37, 120, 245, 0.8)', 'rgba(245, 128, 37,0.8)', 'rgba(245, 128, 37,0.8)',]
      },
      {
        label: 'Q4',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.7)', 'rgba(245, 128, 37,0.7)', 'rgba(37, 120, 245, 0.7)', 'rgba(245, 128, 37,0.7)', 'rgba(245, 128, 37,0.7)',]
      },
      {
        label: 'Q5',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.6)', 'rgba(245, 128, 37,0.6)', 'rgba(37, 120, 245, 0.6)', 'rgba(245, 128, 37,0.6)', 'rgba(245, 128, 37,0.6)',]
      },
      {
        label: 'Q6',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.5)', 'rgba(245, 128, 37,0.5)', 'rgba(37, 120, 245, 0.5)', 'rgba(245, 128, 37,0.5)', 'rgba(245, 128, 37,0.5)',]
      },
      {
        label: 'Q7',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.4)', 'rgba(245, 128, 37,0.4)', 'rgba(37, 120, 245, 0.4)', 'rgba(245, 128, 37,0.4)', 'rgba(245, 128, 37,0.4)',]
      },
      {
        label: 'Q8',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.3)', 'rgba(245, 128, 37,0.3)', 'rgba(37, 120, 245, 0.3)', 'rgba(245, 128, 37,0.3)', 'rgba(245, 128, 37,0.3)',]
      },
      {
        label: 'Q9',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.2)', 'rgba(245, 128, 37,0.2)', 'rgba(37, 120, 245, 0.2)', 'rgba(245, 128, 37,0.2)', 'rgba(245, 128, 37,0.2)',]
      },
      {
        label: 'Q10',
        data: [1.5, 1.2],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.15)', 'rgba(245, 128, 37,0.15)', 'rgba(37, 120, 245, 0.15)', 'rgba(245, 128, 37,0.15)', 'rgba(245, 128, 37,0.15)',]
      }
    ],
  };

  // events
  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }
}

