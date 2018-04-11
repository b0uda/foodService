import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class FoodService {


  private serverUrl = "http://10.0.2.2:3000/";

  constructor(private http: HttpClient) {
  }

  getAllFood() {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}allFood`, { headers: headers })
      .map(res => res);

  }

  getFoodByBudget(budget: number) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}budgetFood/${budget}`, { headers: headers })
      .map(res => res);

  }

  getFoodByCategory(budget: number, category: string) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}categoryFood/${budget}/${category}`, { headers: headers })
      .map(res => res);

  }

  getResponseInfo() {
    let headers = this.createRequestHeader();
    return this.http.get(this.serverUrl, { headers: headers })
      .do(res => res);
  }

  private createRequestHeader() {
    // set headers here e.g.
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return headers;
  }

}

export interface Food {
  id: number;
  name: string;
  place: string;
  price: number;
  category: string;
}

