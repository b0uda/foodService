import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PageRoute } from "nativescript-angular/router";
import "rxjs/add/operator/switchMap";
import { FoodService, Food } from '../food.service';
import * as platformModule from "tns-core-modules/platform";
import { Image } from "ui/image";
var http = require("http");


import * as bghttp from "nativescript-background-http";
var session = bghttp.session("image-upload");

import { StackLayout } from "ui/layouts/stack-layout";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';

var imageModule = require("ui/image");
import * as camera from "nativescript-camera";

import * as imagepicker from "nativescript-imagepicker";

import * as fs from "tns-core-modules/file-system";

import { ListView } from "ui/list-view";
import { selectedIndexProperty } from 'tns-core-modules/ui/list-picker/list-picker';

// require the plugin 
import { LocateAddress } from "nativescript-locate-address";

// instantiate the plugin 
let locator = new LocateAddress();

@Component({
  moduleId: module.id,
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {

  foodId;
  food: Food;
  server = "http://192.168.1.4:3030/";
  hasImage = false;

  // camera

  public imageTaken: ImageAsset;
  public saveToGallery: boolean = true;
  public keepAspectRatio: boolean = true;
  public width: number = 300;
  public height: number = 300;
  img_src = "";

  // DOM Element Reference
  @ViewChild("stackLayout") stackLayout: ElementRef;
  @ViewChild("img") image: ElementRef;
  @ViewChild("list") _list: ElementRef;
  list: ListView;

  constructor(private foodService: FoodService, private pageRoute: PageRoute) {
    this.pageRoute.activatedRoute
      .switchMap(activatedRoute => activatedRoute.params)
      .forEach((params) => { this.foodId = +params["id"]; });
  }

  findPlace() {
    locator.locate({
      lat: 32.0000,
      lng: -5.0000
    }).then(() => {
      console.log("Maps app launched.");
    }, (error) => {
      console.log(error);
    });
  }

  // On Init Component
  ngOnInit() {

    const _deviceType = platformModule.device.deviceType;
    const _stackLayout = <StackLayout>this.stackLayout.nativeElement;
    _stackLayout.className = _deviceType.toLowerCase();
    console.log(_deviceType);

    this.list = <ListView>this._list.nativeElement;

    // Get Image from Url
    let img = <Image>this.image.nativeElement;


    console.dir();
    this.foodService.getFoodById(this.foodId)
      .subscribe((result) => {
        console.log(result);
        this.food = <Food>result;

        // console.log(`${this.server}getImage/${this.food.id}_${this.food.name.replace(/ /g, '')}_${this.food.place.replace(/ /g, '')}`);

        http.getString(`${this.server}getImage/${this.food.id}_${this.food.name.replace(/ /g, '')}_${this.food.place.replace(/ /g, '')}`).then((r) => {
          //// Argument (r) is string!



          http.getImage(`${this.server}uploads/${r}`).then((r) => {
            // Argument (r) is ImageSource!
            img.imageSource = r;
            this.hasImage = true;
            console.log(r);
          }, (err) => {
            // Argument (e) is Error!
            console.log(err);
          });

          // console.log(`http://192.168.1.4:3030/uploads/${r}`);
        }, function (e) {
          //// Argument (e) is Error!

        });

      }, (error) => {
        console.log(`error : ${error}`);
      });

    console.log(`id : ${this.foodId}`);






  }

  // Take Picture
  takePicture() {

    camera.requestPermissions();

    camera.takePicture()
      .then((imageAsset) => {
        console.log("Result is an image asset instance");
        var image = new imageModule.Image();
        image.src = imageAsset;

        console.log(image.src.android);

        let file_url: string = image.src.android;

        let file = image.src.android.split(".");
        console.dir(file);

        // file_url = selection[0].android;

        this.uploadFile(file[0], file[1]);


      }).catch(function (err) {
        console.log("Error -> " + err.message);
      });
  }

  uploadPicture() {

    let file_url: string;

    // image picker
    let context = imagepicker.create({
      mode: "single" // use "multiple" for multiple selection
    });

    context
      .authorize()
      .then(() => {
        return context.present();
      })
      .then((selection) => {

        console.log("Selection done: " + JSON.stringify(selection));
        console.log(selection[0].android);
        let file = selection[0].android.split(".");
        console.dir(file);

        // file_url = selection[0].android;

        this.uploadFile(file[0], file[1]);

        selection.forEach(function (selected) {
          // process the selected image

        });

      }).catch(function (e) {
        // process error
        console.log(e);
      });

  }

  // Upload Image
  uploadFile(file_name: string, file_ext: string) {
    // var documents = fs.knownFolders.documents();

    var request = {
      url: `${this.server}upload`,
      method: "POST",
      headers: {

        "File-Name": `${this.food.id}_${this.food.name}_${this.food.place}.${file_ext}`
      },
      description: "{ 'uploading': " + "Test.jpg" + " }"
    };

    var task = session.uploadFile(`${file_name}.${file_ext}`, request)
    task.on("progress", this.logEvent);
    task.on("error", this.logEvent);
    task.on("complete", this.logEvent);

  }

  logEvent(e) {
    console.log("----------------");
    console.log('Status: ' + e.eventName);
    console.dir(e);
    // console.log(e.object);
    if (e.totalBytes !== undefined) {
      console.log('current bytes transfered: ' + e.currentBytes);
      console.log('Total bytes to transfer: ' + e.totalBytes);
    }
  }

}
