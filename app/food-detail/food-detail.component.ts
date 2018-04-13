import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PageRoute } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";

import { FoodService, Food } from '../food.service';
import * as platformModule from "tns-core-modules/platform";

import { StackLayout } from "ui/layouts/stack-layout";

@Component({
  moduleId: module.id,
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {

  foodId;
  food: Food;

  // DOM Element Reference
  @ViewChild("stackLayout") stackLayout: ElementRef;

  constructor(private foodService: FoodService, private pageRoute: PageRoute) {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach((params) => { this.foodId = +params["id"]; });
  }

  ngOnInit() {

    const _deviceType = platformModule.device.deviceType;
    const _stackLayout = <StackLayout>this.stackLayout.nativeElement;
    _stackLayout.className = _deviceType.toLowerCase();
    console.log(_deviceType);

    console.dir();
    this.foodService.getFoodById(this.foodId)
      .subscribe((result) => {
        console.log(result);
        this.food = <Food>result;
      }, (error) => {
        console.log(`error : ${error}`);
      });

    console.log(`id : ${this.foodId}`);
  }

}
