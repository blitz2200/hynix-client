import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private aIsStart = new ReplaySubject<boolean | null>(1);
  private aIsFinish = new ReplaySubject<boolean | null>(1);
  private bIsStart = new ReplaySubject<boolean | null>(1);
  private bIsFinish = new ReplaySubject<boolean | null>(1);

  getAIsStart(): Observable<boolean | null> {
    return this.aIsStart.asObservable();
  }

  getBIsStart(): Observable<boolean | null> {
    return this.bIsStart.asObservable();
  }

  aStart() {
    this.aIsStart.next(true);
  }

  bStart() {
    this.bIsStart.next(true);
  }

  aFinish() {
    this.aIsFinish.next(true);

  }

  bFinish() {
    this.bIsFinish.next(true);

  }

  getAIsFinish(): Observable<boolean | null> {
    return this.aIsFinish.asObservable();
  }

  getBIsFinish(): Observable<boolean | null> {
    return this.aIsFinish.asObservable();
  }


  constructor() {
  }
}
