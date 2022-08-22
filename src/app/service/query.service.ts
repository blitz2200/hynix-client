import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from '../config/application-config.service';
import { ImageModel } from '../model/image.model';
import { lastValueFrom, Observable } from 'rxjs';
import { ImageModelResult } from '../model/imageResult.model';
import { Response } from '../model/response.model';
import { IRequest } from '../model/request.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/query');
  private testResourceUrl = this.applicationConfigService.getEndpointFor('api/test');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
  }

  query(memoryType: string, type:string, count: number): Promise<ImageModelResult> {
    return lastValueFrom(this.http.get<ImageModelResult>(`${this.resourceUrl}/${memoryType}/${type}/${count}`));
  }

  getKNNResult(request: IRequest): Promise<Response> {
    return lastValueFrom(this.http.post<Response>(`${this.testResourceUrl}/knnsearch`, request));
  }
}
