import { Component, Inject, OnInit } from '@angular/core';
import { ImageModel } from '../../model/image.model';
import { images } from '../../data/image.data';
import * as _ from 'lodash';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  sampleImages?: ImageModel[] = images;
  selectedImage?: ImageModel[] = [];
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public result: ImageModel[],
  ) { }

  ngOnInit(): void {
  }

  onShuffle(){
    let deepCopyImages = _.cloneDeep(images);

   let randomImage = deepCopyImages.sort(() => Math.random() - 0.5).splice(0,10);
   console.log(' randomImage', randomImage);
   this.dialogRef.close(randomImage);
  }

}
