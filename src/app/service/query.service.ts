import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from '../config/application-config.service';
import { ImageModel } from '../model/image.model';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/query');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
  }

  query(memoryType: string, index:number): Promise<ImageModel[]> {
    return lastValueFrom(this.http.get<ImageModel[]>(`${this.resourceUrl}/${memoryType}/${index}`));
  }
}
