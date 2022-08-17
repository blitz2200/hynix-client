import { Component, OnInit } from '@angular/core';
import { ImageModel } from '../model/image.model';
import { DataService } from '../service/data.service';
import { QueryService } from '../service/query.service';
import { images } from '../data/image.data';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {
  isLoading = false;
  randomImages?: ImageModel[] = [];
  count = 9;

  onShuffleImageClick(event?: MouseEvent) {
    // this.randomImages = images.sort(() => Math.random() - 0.5);
    this.randomImages = images;
  }

  constructor(private dataService: DataService,
              private queryService: QueryService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.randomImages = _.cloneDeep(images);
    this.randomImages = this.randomImages!.sort(() => Math.random() - 0.5).slice(0, 10);
    // this.randomImages = images.slice(0, 10);
    this.dataService.getStartProcessing().subscribe(async processor => {
      this.resetDisplay();
      await this.findNearestImage(processor!);
      // if(processor != 'd') {
      //   this.resetDisplay();
      // }
      this.dataService.setFinish(processor!);
    });
  }

  async findNearestImage(memoryType: string) {
    for (let i = 0; i < this.randomImages!.length; i++) {
      let elementById: any = document.getElementById(`image-${i}`);
      let spinner: any = elementById!.childNodes[2];
      let layer: any = elementById!.childNodes[1];
      let complete: any = elementById!.childNodes[3];
      layer.classList.remove('!hidden');
      layer.style.display = "block";
      spinner.classList.remove('!hidden');
      spinner.style.display = "block";
      let imageModels = await this.queryService.query(memoryType, this.randomImages![i].type!, this.count);

      console.log('imageModels', imageModels);
      this.dataService.setNearestImage(imageModels.nearestImages!);
      this.dataService.setResult(imageModels);
      spinner.style.display = "none";
      complete.classList.remove('!hidden');
      complete.style.display = "block";
    }
  }

  private resetDisplay() {

    for (let i = 0; i < this.randomImages!.length; i++) {
      let elementById: any = document.getElementById(`image-${i}`);
      let layer: any = elementById!.childNodes[1];
      let complete: any = elementById!.childNodes[3];
      layer.style.display = "none";
      complete.style.display = "none";
    }
  }

  onStart() {
    this.isLoading = true;
    this.dataService.setStart('a');
  }

  onSelectImage(): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '1241px',
      height: '860px',
      panelClass: 'image-dialog-container'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed : ' , result);
      // this.animal = result;
    });
  }
}
