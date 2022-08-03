import { Component, OnInit } from '@angular/core';
import { ImageModel } from '../model/image.model';

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
    // const evtMsg = event ? ' Event target class is ' + (event.target as HTMLElement).className  : '';
    this.randomImages = images.sort(() => Math.random() - 0.5);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
