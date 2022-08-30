import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('canvas', {static: true}) canvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('progressBar', {static: true}) progressBar?: ElementRef<HTMLCanvasElement>;
  private ctx?: CanvasRenderingContext2D;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private dataService: DataService) {
  }

  lastIndex = 9;
  lastAx = 0;
  lastBx = 0;
  lastCx = 0;
  lastDx = 0;
  lastEx = 0;
  totalTime = [0, 0, 0, 0, 0];

  ngOnInit(): void {
    this.ctx = this.canvas!.nativeElement!.getContext('2d')!;
    this.ctx.font = "bold 14px NanumSquare";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.dataService.getStartProcessing().subscribe(data => {
      if (data.query) {

        let progressbar: any = document.getElementsByClassName(`progressBar`)[0];

        progressbar.style.display = 'none';
        setTimeout(function () {
          progressbar.style.display = 'block';
        }, 0)
        progressbar.style.animationPlayState = 'running';

        // this.resetChartLabel();
        this.ctx!.clearRect(0, 0, this.canvas!.nativeElement.width, this.canvas!.nativeElement.height);
        this.lastAx = 0;
        this.lastBx = 0;
        this.lastCx = 0;
        this.lastDx = 0;
        this.lastEx = 0;
        this.totalTime = [0, 0, 0, 0, 0];

        // this.currentMemoryType = data.memoryType;
        this.enterMouseMemoryType = 'c';
      }

    })
    this.dataService.getResult().subscribe(result => {

      // this.currentMemoryType = result.memoryType;
      if (result.memoryType === 'a') {
        console.log(' Number(result.data)', Number(result.data));
        this.drawA(result);
        this.totalTime[0] += Number(result.data) * 1000;
        if (result.index == 9) {
        }
      }
      if (result.memoryType === 'b') {
        this.drawB(result);
        this.totalTime[1] += Number(result.data) * 1000;
      }
      if (result.memoryType === 'c') {
        this.drawC(result);
        this.totalTime[2] += Number(result.data) * 1000;
      }
      if (result.memoryType === 'd') {
        this.drawD(result);
        this.totalTime[3] += Number(result.data) * 1000;
      }
      if (result.memoryType === 'e') {
        this.drawE(result);
        this.totalTime[4] += Number(result.data) * 1000;
      }


      // @ts-ignore
      // this.barChartData.datasets[result?.index!].push({
      //     label: 'Q' + (result.index+1),
      //     data: [Number(result?.image?.processingTime!.toFixed(2))],
      //     barThickness: 26,
      //     backgroundColor: ['rgba(245, 128, 37)', 'rgba(245, 128, 37)', 'rgba(37, 120, 245)', 'rgba(245, 128, 37)', 'rgba(245, 128, 37)'],
      // });

      // if(result.memoryType ==='c') {
      //   this.barChartData.datasets[result?.index!].data.push(Number(result?.image?.processingTime!.toFixed(2)));
      // }
      // this.chart?.update();

      // 마지막 데이터 없애기 차트는 다음 시작할때 업데이트함
      /*      if (result.index == this.lastIndex) {
              // *2 *4 데이터 없데이트 하기
              for (let i = 0; i <= this.lastIndex; i++) {
                this.barChartData.datasets[i].data.push(0.8);
              }
              for (let i = 0; i <= this.lastIndex; i++) {
                this.barChartData.datasets[i].data.push(0.7);
              }
              this.chart?.update();
              for (let j = 0; j < 3; j++) {
                for (let i = 0; i <= this.lastIndex; i++) {
                  this.barChartData.datasets[i].data.pop();
                }
              }
            }*/

    });
  }

  private drawA(result: any) {
    let opacity = (10 - (result.index / 2)) / 10
    this.ctx!.fillStyle = 'rgba(245, 128, 37,' + opacity + ')';
    let width = Number(result.data) * 34;
    this.ctx!.fillRect(this.lastAx, 15, width, 26);
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillText("Q" + (result.index + 1), this.lastAx + (width / 2), 28)
    this.lastAx = this.lastAx + width;
  }

  private drawB(result: any) {
    let opacity = (10 - (result.index / 2)) / 10
    this.ctx!.fillStyle = 'rgba(245, 128, 37,' + opacity + ')';
    let width = Number(result.data) * 34;
    this.ctx!.fillRect(this.lastBx, 54, width, 26);
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillText("Q" + (result.index + 1), this.lastBx + (width / 2), 67)
    this.lastBx = this.lastBx + width;
  }

  private drawC(result: any) {
    let opacity = (10 - (result.index / 2)) / 10

    this.ctx!.fillStyle = 'rgba(37, 120, 245,' + opacity + ')';
    let width = Number(result.data) * 34;
    this.ctx!.fillRect(this.lastCx, 93, width, 26);

    this.ctx!.fillStyle = 'white';

    this.ctx!.fillText("Q" + (result.index + 1), this.lastCx + (width / 2), 106)
    this.lastCx = this.lastCx + width;
  }

  private drawD(result: any) {
    let opacity = (10 - (result.index / 2)) / 10
    this.ctx!.fillStyle = 'rgba(245, 128, 37,' + opacity + ')';
    let width = Number(result.data) * 34;
    this.ctx!.fillRect(this.lastDx, 132, width, 26);
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillText("Q" + (result.index + 1), this.lastDx + (width / 2), 145)
    this.lastDx = this.lastDx + width;
  }

  private drawE(result: any) {
    let opacity = (10 - (result.index / 2)) / 10
    this.ctx!.fillStyle = 'rgba(245, 128, 37,' + opacity + ')';
    let width = Number(result.data) * 34;
    this.ctx!.fillRect(this.lastEx, 171, width, 26);
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillText("Q" + (result.index + 1), this.lastEx + (width / 2), 184)
    this.lastEx = this.lastEx + width;
  }

  enterMouseMemoryType = '';
  currentMemoryType = 'c';
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
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37)', 'rgba(245, 128, 37)', 'rgba(37, 120, 245)', 'rgba(245, 128, 37)', 'rgba(245, 128, 37)'],
      },
      {
        label: 'Q2',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.9)', 'rgba(245, 128, 37,0.9)', 'rgba(37, 120, 245, 0.9)', 'rgba(245, 128, 37,0.9)', 'rgba(245, 128, 37,0.9)',]
      },
      {
        label: 'Q3',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.8)', 'rgba(245, 128, 37,0.8)', 'rgba(37, 120, 245, 0.8)', 'rgba(245, 128, 37,0.8)', 'rgba(245, 128, 37,0.8)',]
      },
      {
        label: 'Q4',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.7)', 'rgba(245, 128, 37,0.7)', 'rgba(37, 120, 245, 0.7)', 'rgba(245, 128, 37,0.7)', 'rgba(245, 128, 37,0.7)',]
      },
      {
        label: 'Q5',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.6)', 'rgba(245, 128, 37,0.6)', 'rgba(37, 120, 245, 0.6)', 'rgba(245, 128, 37,0.6)', 'rgba(245, 128, 37,0.6)',]
      },
      {
        label: 'Q6',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.5)', 'rgba(245, 128, 37,0.5)', 'rgba(37, 120, 245, 0.5)', 'rgba(245, 128, 37,0.5)', 'rgba(245, 128, 37,0.5)',]
      },
      {
        label: 'Q7',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.4)', 'rgba(245, 128, 37,0.4)', 'rgba(37, 120, 245, 0.4)', 'rgba(245, 128, 37,0.4)', 'rgba(245, 128, 37,0.4)',]
      },
      {
        label: 'Q8',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.3)', 'rgba(245, 128, 37,0.3)', 'rgba(37, 120, 245, 0.3)', 'rgba(245, 128, 37,0.3)', 'rgba(245, 128, 37,0.3)',]
      },
      {
        label: 'Q9',
        data: [],
        barThickness: 26,
        backgroundColor: ['rgba(245, 128, 37,0.2)', 'rgba(245, 128, 37,0.2)', 'rgba(37, 120, 245, 0.2)', 'rgba(245, 128, 37,0.2)', 'rgba(245, 128, 37,0.2)',]
      },
      {
        label: 'Q10',
        data: [],
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

  mouseEnter(type: string) {
    this.enterMouseMemoryType = type;
    this.dataService.setStart({'processor': type, 'query': false});
    this.dataService.setMouseOver(type);
  }

  mouseLeave(type: string) {
    this.enterMouseMemoryType = this.currentMemoryType;
    this.dataService.setMouseOver(this.currentMemoryType);

    // this.dataService.setStart({
    //   'processor': this.currentMemoryType === '' ? 'c' : this.currentMemoryType,
    //   'query': false
    // });
  }

  private resetChartLabel() {
    // @ts-ignore
    this.chart!.chart!.options!.scales!['y']!.ticks!.backdropColor = ['#0E306D', 'white', 'white', 'white', 'white',];
    this.chart!.chart!.options!.scales!['y']!.ticks!.color = ['white', '#0E306D', '#0E306D', '#0E306D', '#0E306D'];
    this.chart?.update();
  }

  totalExecutionTime(index: number) {
    return this.totalTime[index];
  }
}

