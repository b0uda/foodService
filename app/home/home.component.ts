import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FoodService, Food } from '../food.service';
import * as platformModule from "tns-core-modules/platform";

import { StackLayout } from "ui/layouts/stack-layout";
import { GridLayout } from "ui/layouts/grid-layout";
import { ItemEventData } from "ui/list-view";
import { TextField } from "ui/text-field";

import { DeviceType } from "ui/enums";
import { device } from "platform";
import { Page } from "ui/page";

import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { RouterExtensions } from 'nativescript-angular/router';


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
  foodSelected: GridLayout;

  errorNaN;

  // DropDown Categories Attributes
  selectedIndex = 0;
  categories: Array<string>;

  // DropDown Categories Attributes
  selectedIndexPlaces = 0;
  places;

  // DOM Element Reference
  @ViewChild("stackLayout") stackLayout: ElementRef;

  // Constructor
  constructor(private foodService: FoodService, private routerExtensions: RouterExtensions) {
    this.budget = 25;
    this.categories = ["All", "burger", "tacos", "pizza", "sandwich", "pasta"];

  }


  getIcon(category: string) {
    switch (category) {
      case "burger":
        return "r";
      case "tacos":
        return "E";
      case "pizza":
        return "j";
      case "sandwich":
        return "g";
      case "pasta":
        return "t";


      default:
        break;
    }
  }

  // When user click on item food
  public onItemTap(args: ItemEventData) {

    this.foodSelected = <GridLayout>args.view;

    console.log(this.foodSelected.id);

    this.routerExtensions.navigate(["/details", this.foodSelected.id], {
      transition: {
        name: "explode",
        duration: 600,
        curve: "easeInOut"
      }
    });

  }

  // Budget TextView Change load FoodsList again
  onBudgetChange(args) {
    let textField: TextField = <TextField>args.object;
    this.selectedIndexPlaces = 0;
    //setTimeOut hack because this.budget doesnt update before textChanged method
    setTimeout(() => {
      if (isNaN(this.budget)) {
        this.budget = 25;
        this.errorNaN = true;
      }
      console.log(this.budget);
      this.loadFood();
    }, 100);

  }

  // DropDown Category Menu Methods
  public onchange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down category selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    this.selectedIndex = args.newIndex;
    this.loadFood();
  }

  public onopen() {
    console.log("Drop Down opened.");
  }

  public onPlacesClose() {
    console.log("Drop Down closed.");
  }

  // DropDown Places Menu Methods
  public onPlaceschange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down places selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    this.selectedIndexPlaces = args.newIndex;
    this.loadFood();
  }

  public onPlacesOpen() {
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

    this.initPlacesDropDown();

    // Load food App first load
    this.loadFood();
  }



  // Load Food Method
  loadFood() {
    this.foodList = [];
    console.log(`category index is : ${this.selectedIndex} && place index is : ${this.selectedIndexPlaces}`);
    // if All is selected get All categories
    if (this.selectedIndex === 0 && this.selectedIndexPlaces === 0) {
      this.extractFoodByBudget();
    } else if (this.selectedIndex > 0 && this.selectedIndexPlaces === 0) {
      this.extractFoodByCategory();
    } else if (this.selectedIndex === 0 && this.selectedIndexPlaces > 0) {
      this.extractFoodByPlace();
    } else if (this.selectedIndex > 0 && this.selectedIndexPlaces > 0) {
      this.extractFoodByCategoryAndPlace();
    }
  }

  // backend service Methods


  initPlacesDropDown() {
    this.foodService.getPlaces()
      .subscribe((result) => {
        this.places = result;
      }, (error) => {
        this.onGetDataError(error);
      });
  }

  // call service ==> getFoodByBudget
  extractFoodByBudget() {


    console.log("food by budget called");
    this.foodService.getFoodByBudget(this.budget)
      .subscribe((result) => {
        this.onGetDataSuccess(result);

        let _places = [];
        for (let i = 0; i < this.foodList.length; i++) {

          let _place = this.foodList[i].place;

          if (_places.indexOf(_place) == -1) {
            _places.push(_place);
          }
        }
        console.log("places: ");
        _places = ["All", ..._places]
        this.places = _places;

        this.selectedIndexPlaces = 0;

        console.dir(_places);


      }, (error) => {
        this.onGetDataError(error);
      });
  }

  // call service ==> getFoodByCaterory
  extractFoodByCategory() {
    console.log("food by category called");
    console.log(this.categories[this.selectedIndex]);
    this.foodService.getFoodByCategory(this.budget, this.categories[this.selectedIndex])
      .subscribe((result) => {
        this.onGetDataSuccess(result);
        console.dir(result);
      }, (error) => {
        this.onGetDataError(error);
      });
  }

  // call service ==> getFoodByplaces
  extractFoodByPlace() {
    console.log("food by Place called");
    console.log(this.places[this.selectedIndexPlaces]);
    this.foodService.getFoodByPlace(this.budget, this.places[this.selectedIndexPlaces].replace(/ /g, ''))
      .subscribe((result) => {
        this.onGetDataSuccess(result);
        console.dir(result);
      }, (error) => {
        this.onGetDataError(error);
      });
  }

  // call service ==> getFoodByCateroryAndPlaces
  extractFoodByCategoryAndPlace() {
    this.foodService.getFoodByCategoryAndPlace(this.budget, this.places[this.selectedIndexPlaces].replace(/ /g, ''), this.categories[this.selectedIndex])
      .subscribe((result) => {
        this.onGetDataSuccess(result);
        console.dir(result);
      }, (error) => {
        this.onGetDataError(error);
      });
    console.log("food by category and Place called");
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