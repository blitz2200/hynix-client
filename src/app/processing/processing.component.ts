import { Component, OnInit } from '@angular/core';
import { ImageModel } from '../model/image.model';
import { DataService } from '../service/data.service';
import { QueryService } from '../service/query.service';
import { images } from '../data/image.data';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import * as _ from 'lodash';
import { IRequest } from '../model/request.model';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {
  isLoading:boolean = false;
  selectedImages?: ImageModel[] = [];
  count = 9;

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
        await this.findNearestImage(processor!);
        // if(processor != 'd') {
        //   this.resetDisplay();
        // }
        this.dataService.setFinish(processor!);
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
      let spinner: any = elementById!.childNodes[2];
      let layer: any = elementById!.childNodes[1];
      let complete: any = elementById!.childNodes[3];
      let button: any = elementById!.childNodes[4];
      // layer.classList.remove('!hidden');
      image.style.border = '2px solid #F58025';
      layer.style.display = "none";
      spinner.classList.remove('!hidden');
      spinner.style.display = "block";
      button.style.backgroundColor = '#F58025';
      button.style.color = 'white';
      // let imageModels = await this.queryService.query(memoryType, this.selectedImages![i].type!, this.count);
      const request = this.createRequest(this.selectedImages![i].type!);
      const startTime = new Date().valueOf();
      let knnResult = await this.queryService.getKNNResult(request);
      knnResult = {
        ...knnResult,
        imageType: this.selectedImages![i].type!,
        processingTime:(new Date().valueOf() -  startTime) /1000,
      }
      this.dataService.setNearestImage(knnResult);
      this.dataService.setResult({image: knnResult, index: i});
      image.style.border = 'none';

      spinner.style.display = "none";
      complete.classList.remove('!hidden');
      complete.style.display = "block";
      button.style.backgroundColor = 'white';
      button.style.color = '#0E306D';
    }
    this.isLoading = false;
  }

  protected createRequest(type: string): IRequest {
    return {
      knnSize: this.count,
      knnType: 0,
      knnThreshold: -1,
      features: [],
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
    this.dataService.setStart({'processor':'c', 'query': true});
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
}
