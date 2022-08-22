import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ImageModel } from '../model/image.model';
import { Result } from '../model/result.model';
import { Response } from '../model/response.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private dataService: DataService,) { }

  nearestImage?: Response;

  ngOnInit(): void {
    this.dataService.getNearestImage().subscribe(async nearestImage => {
      this.nearestImage = nearestImage!;
    });
  }

}
