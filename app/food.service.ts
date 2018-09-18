import { Injectable } from '@angular/core';
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class FoodService {


  private serverUrl = "http://foodservice-216501.appspot.com/";

  constructor(private http: HttpClient) {
  }

  // http://10.0.2.2:3030/   http://192.168.1.4:3030/

  // get All food
  getAllFood() {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}allFood`, { headers: headers })
      .map(res => res);

  }

  getFoodById(id: number) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}food/${id}`, { headers: headers })
      .map(res => res);

  }

  getPlaces() {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}places`, { headers: headers })
      .map(res => res);
  }

  getPlaceInfo(name: string) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}getPlaceInfo/${name.replace(/ /g, '')}`, { headers: headers })
      .map(res => res);
  }

  // get food by budget
  getFoodByBudget(budget: number) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}budgetFood/${budget}`, { headers: headers })
      .map(res => res);

  }

  // get food by category
  getFoodByCategory(budget: number, category: string) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}categoryFood/${budget}/${category}`, { headers: headers })
      .map(res => res);

  }

  // get food by place
  getFoodByPlace(budget: number, place: string) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}placeFood/${budget}/${place}`, { headers: headers })
      .map(res => res);

  }

  // get food by category and place
  getFoodByCategoryAndPlace(budget: number, place: string, category: string) {
    let headers = this.createRequestHeader();

    return this.http.get(`${this.serverUrl}categoryAndPlaceFood/${budget}/${category}/${place}`, { headers: headers })
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

