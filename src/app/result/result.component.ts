import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ImageModel } from '../model/image.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private dataService: DataService,) { }

  nearestImage: ImageModel[] = [];

  ngOnInit(): void {
    this.dataService.getNearestImage().subscribe(async nearestImage => {
      console.log('nearestImage', nearestImage);
      this.nearestImage = nearestImage!;
    });
  }

}
