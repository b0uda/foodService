import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FoodService, Food } from '../food.service';
import * as platformModule from "tns-core-modules/platform";
import { StackLayout } from "ui/layouts/stack-layout";


import { DeviceType } from "ui/enums";
import { device } from "platform";
import { Page } from "ui/page";

import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Food Attribute Logic
  budget: number;
  foodList: Array<Food>;
  result: string;

  // DropDown Attributes
  selectedIndex = 0;
  categories: Array<string>;


  // DOM Element Reference
  @ViewChild("stackLayout") stackLayout: ElementRef;

  // Constructor
  constructor(private foodService: FoodService) {
    this.budget = 25;
    this.categories = ["All", "burger", "tacos", "pizza", "sandwich", "pasta"];
  }

  // DropDown Menu Methods
  public onchange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  }

  public onopen() {
    console.log("Drop Down opened.");
  }

  public onclose() {
    console.log("Drop Down closed.");
  }

  // NgInit
  ngOnInit() {
    const _deviceType = platformModule.device.deviceType;
    const _stackLayout = <StackLayout>this.stackLayout.nativeElement;
    _stackLayout.className = _deviceType.toLowerCase();
    console.log(_deviceType);

  }

  // Load Food Method
  loadFood(args) {
    this.foodList = [];

    // if All is selected get All categories
    if (this.selectedIndex === 0) {
      this.extractFoodByBudget()
    } else {
      this.extractFoodByCategory()
    }

  }

  // backend service Methods

  // call service ==> getFoodByBudget
  extractFoodByBudget() {
    console.log("food by budget called");
    this.foodService.getFoodByBudget(this.budget)
      .subscribe((result) => {
        this.onGetDataSuccess(result);
      }, (error) => {
        this.onGetDataError(error);
      });
  }

  // call service ==> getFoodByCaterory
  extractFoodByCategory() {
    console.log("food by category called");
    this.foodService.getFoodByCategory(this.budget, this.categories[this.selectedIndex])
      .subscribe((result) => {
        this.onGetDataSuccess(result);
      }, (error) => {
        this.onGetDataError(error);
      });
  }


  // what to do with data returned from the service
  private onGetDataSuccess(res) {
    this.foodList = res;
  }

  // what to do if service returns ERROR
  private onGetDataError(error: Response | any) {

    const body = error.json() || "";
    const err = body.error || JSON.stringify(body);
    console.log("onGetDataError: " + err);
  }

}