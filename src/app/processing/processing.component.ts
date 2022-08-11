import { Component, OnInit } from '@angular/core';
import { ImageModel } from '../model/image.model';
import { DataService } from '../service/data.service';
import { QueryService } from '../service/query.service';
import { forkJoin } from 'rxjs';

const images: ImageModel[] = [
  new ImageModel(0, 'assets/images/n00007846_149204_person.jpg'),
  new ImageModel(1, 'assets/images/n00007846_152343_person.jpg'),
  new ImageModel(2, 'assets/images/n03534580_hoopskirt.jpg'),
  new ImageModel(3, 'assets/images/n04371430_4930_swimming_trunks.jpg'),
  new ImageModel(4, 'assets/images/n04409515_6040_tennis_ball.jpg'),
  new ImageModel(5, 'assets/images/n04487394_23210_trombone.jpg'),
  new ImageModel(6, 'assets/images/n04536866_19280_violin.jpg'),
  new ImageModel(7, 'assets/images/n04591157_4443_tie.jpg'),
  new ImageModel(8, 'assets/images/n07695742_10673_pretzel.jpg'),
];

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  randomImages?: ImageModel[] = images;

  onShuffleImageClick(event?: MouseEvent) {
    this.randomImages = images.sort(() => Math.random() - 0.5);
  }

  constructor(private dataService: DataService,
              private queryService: QueryService,) {
  }

  ngOnInit(): void {

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
    for (let i = 0; i< this.randomImages!.length; i++) {
      let elementById:any = document.getElementById(`image-${i}`);
      let spinner:any = elementById!.childNodes[2];
      let layer:any = elementById!.childNodes[1];
      let complete:any = elementById!.childNodes[3];
      layer.classList.remove('!hidden');
      layer.style.display="block";
      spinner.classList.remove('!hidden');
      spinner.style.display="block";
      let imageModels = await this.queryService.query(memoryType, this.randomImages![i].index);

      console.log('imageModels', imageModels);
      this.dataService.setNearestImage(imageModels.nearestImages!);
      this.dataService.setResult(imageModels);
      spinner.style.display="none";
      complete.classList.remove('!hidden');
      complete.style.display="block";
    }
  }

  private resetDisplay() {

    for (let i = 0; i< this.randomImages!.length; i++) {
      let elementById:any = document.getElementById(`image-${i}`);
      let layer:any = elementById!.childNodes[1];
      let complete:any = elementById!.childNodes[3];
      layer.style.display="none";
      complete.style.display="none";
    }
  }
}
