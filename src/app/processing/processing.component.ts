import { Component, OnInit } from '@angular/core';
import { ImageModel } from '../model/image.model';
import { DataService } from '../service/data.service';
import { QueryService } from '../service/query.service';
import { images } from '../data/image.data';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import * as _ from 'lodash';
import { IRequest } from '../model/request.model';
// @ts-ignore
import * as featureData from '../../assets/feature.json';
import { concatMap, delay, forkJoin, from, lastValueFrom, of } from 'rxjs';


@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {
  isLoading: boolean = false;
  selectedImages?: ImageModel[] = [];
  count = 9;
  feature: any = featureData;

  onShuffleImageClick(event?: MouseEvent) {
    // this.randomImages = images.sort(() => Math.random() - 0.5);
    this.selectedImages = images;
  }

  constructor(private dataService: DataService,
              private queryService: QueryService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.selectedImages = _.cloneDeep(images);
    this.selectedImages = this.selectedImages!.sort(() => Math.random() - 0.5).slice(0, 10);
    // this.randomImages = images.slice(0, 10);
    this.dataService.getStartProcessing().subscribe(processor => {
      // console.log(' processor, ', processor);

      if (processor.query) {
        this.resetDisplay();
        const taskPromises = [this.createEvent('a'),
          this.createEvent('b'),
          this.findNearestImage('c'),
          this.createEvent('d'),
          this.createEvent('e'),
        ]

        forkJoin(taskPromises).subscribe(
          (result) => {
            console.log('taskPromises result', result);
            this.isLoading = false;

          }
        )
      }
    });
  }

  createEvent(memoryType: string) {
    const memoryAType = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    const memoryBType = [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8];
    const memoryCType = [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
    const memoryDType = [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2];
    const memoryEType = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let memoryData = memoryAType;
    switch (memoryType) {
      case 'a':
        memoryData = memoryAType;
        break;
      case 'b':
        memoryData = memoryBType;
        break;
      case 'c':
        memoryData = memoryCType;
        break;
      case 'd':
        memoryData = memoryDType;
        break;
      case 'e':
        memoryData = memoryEType;
        break;
      default:
        memoryData = memoryAType;
    }

    let observable = from(memoryData).pipe(concatMap((item, index) =>
      of([item, index]).pipe(delay(item * 1000))));
    observable.subscribe(([item, index]) => this.dataService.setResult({
      index: index,
      data: item,
      memoryType: memoryType
    }));
    return observable;

  }


  async findNearestImage(memoryType: string) {
    for (let i = 0; i < this.selectedImages!.length; i++) {
      let elementById: any = document.getElementById(`image-${i}`);
      let layer: any = elementById!.childNodes[1];
      layer.style.display = "block";
    }

    for (let i = 0; i < this.selectedImages!.length; i++) {
      let elementById: any = document.getElementById(`image-${i}`);
      let image: any = elementById!.childNodes[0];
      let layer: any = elementById!.childNodes[1];
      let spinner: any = elementById!.childNodes[2];
      let complete: any = elementById!.childNodes[3];
      let button: any = elementById!.childNodes[4];

      image.style.border = '2px solid #F58025';
      layer.style.display = "none";
      spinner.classList.remove('!hidden');
      spinner.style.display = "block";
      button.style.backgroundColor = '#F58025';
      button.style.color = 'white';

      const request = this.createRequest(this.selectedImages![i].type!);
      const startTime = new Date().valueOf();
      await this.sleep(memoryType);
      let knnResult = await this.queryService.getKNNResult(request);
      knnResult = {
        ...knnResult,
        imageType: this.selectedImages![i].type!,
        processingTime: (new Date().valueOf() - startTime) / 1000,
      }
      this.dataService.setNearestImage({'image': knnResult, 'index': i});
      this.dataService.setResult({data: (new Date().valueOf() - startTime) / 1000, index: i, memoryType: memoryType});
      if (i < this.selectedImages!.length - 1) {
        image.style.border = 'none';
        button.style.backgroundColor = 'white';
        button.style.color = '#0E306D';
      }
      spinner.style.display = "none";
      complete.classList.remove('!hidden');
      complete.style.display = "block";
    }
  }

  private async sleep(memoryType: string) {
    switch (memoryType) {
      case 'a':
        await new Promise(resolve => setTimeout(resolve, 1600));
        break;
      case 'b':
        await new Promise(resolve => setTimeout(resolve, 1400));
        break;
      case 'c':
        await new Promise(resolve => setTimeout(resolve, 1200));
        break;
      case 'd':
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;
      case 'e':
        await new Promise(resolve => setTimeout(resolve, 800));
        break;
      default:
        await new Promise(resolve => setTimeout(resolve, 2000));
        break;
    }
  }

  protected createRequest(type: string): IRequest {

    return {
      knnSize: this.count,
      knnType: 0,
      knnThreshold: -1,
      features: this.feature[type],
      imageType: type,
    };
  }

  private resetDisplay() {

    for (let i = 0; i < this.selectedImages!.length; i++) {
      let elementById: any = document.getElementById(`image-${i}`);
      let layer: any = elementById!.childNodes[1];
      let complete: any = elementById!.childNodes[3];
      let button: any = elementById!.childNodes[4];
      button.style.backgroundColor = 'white';
      button.style.color = '#0E306D';
      layer.style.display = "none";
      complete.style.display = "none";
    }
  }

  onStart() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.dataService.setStart({'memoryType': 'c', 'query': true});
  }

  onSelectImage(): void {
    if (this.isLoading) {
      return;
    }
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '1241px',
      height: '860px',
      panelClass: 'image-dialog-container'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetDisplay();
        this.selectedImages = result;
      }
    });
  }

  onClickImage(index: number) {
    this.dataService.setSelectImage(index);
    this.clearBorder();
    let elementById: any = document.getElementById(`image-${index}`);
    let image: any = elementById!.childNodes[0];
    let button: any = elementById!.childNodes[4];
    image.style.border = '2px solid #F58025';
    button.style.backgroundColor = '#F58025';
    button.style.color = 'white';
  }

  private clearBorder() {
    for (let i = 0; i < this.selectedImages!.length; i++) {
      let elementById: any = document.getElementById(`image-${i}`);
      let button: any = elementById!.childNodes[4];
      let image: any = elementById!.childNodes[0];
      image.style.border = 'none';
      button.style.backgroundColor = 'white';
      button.style.color = '#0E306D';
    }
  }
}
