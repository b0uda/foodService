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

  budget: number;
  foodList: Array<Food>;
  result: string;
  foodListFiltred: Array<Food>;
  foodListCategoryHack: Array<Food>;

  selectedIndex = 0;
  categories: Array<string>;



  @ViewChild("stackLayout") stackLayout: ElementRef;

  constructor(private foodService: FoodService) {
    this.budget = 25;
    this.foodListFiltred = [];


    this.categories = ["All", "burger", "tacos", "pizza", "sandwich", "pasta"];
  }

  public onchange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  }

  public onopen() {
    console.log("Drop Down opened.");
  }

  public onclose() {
    console.log("Drop Down closed.");
  }

  ngOnInit() {
    const _deviceType = platformModule.device.deviceType;
    const _stackLayout = <StackLayout>this.stackLayout.nativeElement;
    _stackLayout.className = _deviceType.toLowerCase();
    console.log(_deviceType);



    this.foodList = this.foodService.getFoodByPrice(this.budget);
  }

  loadFood(args) {
    console.log(this.budget);
    this.foodListFiltred = [];
    this.foodListCategoryHack = [];

    if (this.selectedIndex === 0) {
      this.loadAllFoods();
    } else {
      this.loadFoodByCategory();
    }

  }


  loadAllFoods() {
    this.foodList.forEach(food => {
      if (food.price < this.budget) {
        this.foodListFiltred.push(food);
      }
    });
  }

  loadFoodByCategory() {
    this.foodList.forEach(food => {
      if (food.price < this.budget) {
        this.foodListFiltred.push(food);
      }
    });



    this.foodListFiltred.forEach(food => {
      if (food.category == this.categories[this.selectedIndex]) {
        this.foodListCategoryHack.push(food);
      }
    });


    this.foodListFiltred = this.foodListCategoryHack;


  }

}