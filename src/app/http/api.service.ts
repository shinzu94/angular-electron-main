import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {
  AdvanceBodyDataDto,
  BodyDataModel,
  CalculateAdvanceBodyData,
  CreateBodyDataModel
} from '../bodyData/body-data-model';
import {Observable} from 'rxjs';
import {Status} from '../model/status.model';
import {UserModel} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  disableApp() {
    this.http
      .get("/api/v1/app/disable", this.prepareOptions())
      .subscribe();
  }

  addBodyData(bodyData: CreateBodyDataModel) {
    return this.http
      .post("/api/v1/bodydata", bodyData, this.prepareOptions());
  }

  getBodyData() {
    return this.http
      .get<BodyDataModel[]>("/api/v1/bodydata", this.prepareOptions());
  }

  getUp() {
    return this.http
      .get<Status>("/actuator/health", {});
  }

  getMyData() {
    return this.http
      .get<UserModel>("/api/v1/user/me", this.prepareOptions());
  }

  getAdvanceBodyData(data: CalculateAdvanceBodyData) {
    const options = this.prepareOptions();
    const httpParam = new HttpParams().appendAll({
      "height": data.height,
      "weight": data.weight
    });
    if (data.fatFreeMass !== null) {
      httpParam.append("fatFreeMass", data.fatFreeMass);
    }
    options.params = httpParam;
    return this.http
      .get<AdvanceBodyDataDto>("/api/v1/bodydata/advance", options);
  }

  prepareOptions(): Options {
    const accessToken: string | null = localStorage.getItem('access_token');
    return new Options(new HttpHeaders().append("Authorization", 'Bearer ' + accessToken));
  }
}
class Options {
  headers: HttpHeaders;
  public params?: HttpParams;

  constructor(headers: HttpHeaders) {
    this.headers = headers;
  }
}
