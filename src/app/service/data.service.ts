import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ImageModel } from '../model/image.model';
import { ImageModelResult } from '../model/imageResult.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private startProcessing = new ReplaySubject<string | null>(1);
  private finishProcessing = new ReplaySubject<string | null>(1);
  private nearestImage = new ReplaySubject<ImageModel[] | null>(1);
  private result = new ReplaySubject<any>(1);

  getStartProcessing(): Observable<string | null> {
    return this.startProcessing.asObservable();
  }

  getFinishProcessing(): Observable<string | null> {
    return this.finishProcessing.asObservable();
  }

  getNearestImage(): Observable<ImageModel[] | null> {
    return this.nearestImage.asObservable();
  }

  getResult(): Observable<any> {
    return this.result.asObservable();
  }

  setStart(type: string) {
    this.startProcessing.next(type);
  }

  setFinish(type: string) {
    this.finishProcessing.next(type);
  }

  setNearestImage(images: ImageModel[]) {
    this.nearestImage.next(images);
  }

  setResult(result: any) {
    this.result.next(result);
  }

  constructor() {
  }
}
