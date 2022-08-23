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

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {
  isLoading:boolean = false;
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
    this.dataService.getStartProcessing().subscribe(async processor => {
      if (processor.query) {
        this.resetDisplay();
        await this.findNearestImage('a');
        // await this.findNearestImage('b');
        // await this.findNearestImage('c');
        // await this.findNearestImage('d');
        // await this.findNearestImage('e');
        this.isLoading = false;
      }
    });
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
        processingTime:(new Date().valueOf() -  startTime) /1000,
      }
      this.dataService.setNearestImage({'image': knnResult, 'index': i});
      this.dataService.setResult({image: knnResult, index: i, memoryType: memoryType});
      image.style.border = 'none';
      spinner.style.display = "none";
      complete.classList.remove('!hidden');
      complete.style.display = "block";
      button.style.backgroundColor = 'white';
      button.style.color = '#0E306D';
    }
  }

  private async sleep(memoryType: string) {
    switch (memoryType){
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
      layer.style.display = "none";
      complete.style.display = "none";
    }
  }

  onStart() {
    if(this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.dataService.setStart({'processor':'a', 'query': true});
  }

  onSelectImage(): void {
    if(this.isLoading) {
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
  }
}
