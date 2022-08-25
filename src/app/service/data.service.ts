import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ImageModel } from '../model/image.model';
import { ImageModelResult } from '../model/imageResult.model';
import { Result } from '../model/result.model';
import { Response} from '../model/response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private startProcessing = new ReplaySubject<string | null>(1);
  private nearestImage = new ReplaySubject<Response | null>(1);
  private result = new ReplaySubject<any>(1);
  private selectImage = new ReplaySubject<number>(1);
  private mouseOver = new ReplaySubject<string>(1);

  getStartProcessing(): Observable<any> {
    return this.startProcessing.asObservable();
  }


  getNearestImage(): Observable<any> {
    return this.nearestImage.asObservable();
  }

  getResult(): Observable<any> {
    return this.result.asObservable();
  }

  getSelectImage(): Observable<number> {
    return this.selectImage.asObservable();
  }

  getMouseOver(): Observable<string> {
    return this.mouseOver.asObservable();
  }

  setStart(type: any) {
    this.startProcessing.next(type);
  }

  setMouseOver(type: string) {
    this.mouseOver.next(type);
  }

  setNearestImage(response: any) {
    this.nearestImage.next(response);
  }

  setResult(result: any) {
    this.result.next(result);
  }

  setSelectImage(int: number){
    this.selectImage.next(int);
  }

  constructor() {
  }
}
