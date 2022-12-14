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
  selectedImage: ImageModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public result: ImageModel[],
  ) {
  }

  ngOnInit(): void {
  }

  onSave() {
    if(this.selectedImage.length !==10) {
      alert('Please select 10 images.');
      return;
    }
    this.dialogRef.close(this.selectedImage);

  }
  onShuffle() {
    let deepCopyImages = _.cloneDeep(images);

    let randomImage = deepCopyImages.sort(() => Math.random() - 0.5).splice(0, 10);
    console.log(' randomImage', randomImage);
    this.dialogRef.close(randomImage);
  }

  toggleImage(image: ImageModel) {

    if (this.selectedImage.some(e => e.fileName === image.fileName)) {
      this.selectedImage = this.selectedImage.filter(e => e.fileName != image.fileName);
    } else {
      if (this.selectedImage.length > 9) {
        alert('Selected image must be no more than 10')
        return;
      }
      this.selectedImage.push(image);
    }
  }

  checkActiveImage(image: ImageModel): string {
    if (this.selectedImage.some(e => e.fileName === image.fileName)) {
      return 'active';
    }

    return 'inactive'
  }

  checkImage(image: ImageModel): boolean {
    return this.selectedImage.some(e => e.fileName === image.fileName)
  }

}
