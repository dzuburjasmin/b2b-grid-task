import { HttpClient } from '@angular/common/http';
import {Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class HttpLayerService {
  baseUrl: string = "http://77.78.198.63:252";

  constructor(@Inject(HttpClient) public httpClient: HttpClient)
  {}
  getData(url:string):Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl+ "/" + url);
  }
}
