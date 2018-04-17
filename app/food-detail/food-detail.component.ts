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

@Component({
  moduleId: module.id,
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {

  foodId;
  food: Food;


  // camera

  public imageTaken: ImageAsset;
  public saveToGallery: boolean = true;
  public keepAspectRatio: boolean = true;
  public width: number = 300;
  public height: number = 300;

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


  // On Init Component
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



    this.list = <ListView>this._list.nativeElement;





    // Get Image from Url
    let img = <Image>this.image.nativeElement;
    http.getImage("https://image.ibb.co/i9Lrp7/4.jpg").then((r) => {

      img.imageSource = r;
      // img.src = "res://dh";

    }, (err) => {
      // Argument (e) is Error!
    });
  }

  // Take Picture
  takePicture() {

    camera.requestPermissions();

    camera.takePicture()
      .then(function (imageAsset) {
        console.log("Result is an image asset instance");
        var image = new imageModule.Image();
        image.src = imageAsset;

        console.log(image.src.android);

        let file_url: string = image.src.android;

        // upload picture captured
        var request = {
          url: "http://192.168.1.2:3030",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            "File-Name": `test.jpg`
          },
          description: "{ 'uploading': " + "Test.jpg" + " }"
        };

        var task = session.uploadFile(file_url, request)

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
      .then(function () {
        return context.present();
      })
      .then(function (selection) {

        console.log("Selection done: " + JSON.stringify(selection));
        console.log(selection[0].android);

        file_url = selection[0].android;

        var request = {
          url: "http://192.168.1.2:3030",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            "File-Name": `test.jpg`
          },
          description: "{ 'uploading': " + "Test.jpg" + " }"
        };

        var task = session.uploadFile(file_url, request)

        selection.forEach(function (selected) {
          // process the selected image



        });

      }).catch(function (e) {
        // process error
        console.log(e);
      });




  }

  // Upload Image
  uploadFile(file: string) {
    // var documents = fs.knownFolders.documents();



    var request = {
      url: "http://192.168.1.2:3030",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "File-Name": `${this.food.id}_${this.food.name}_${this.food.place}.jpg`
      },
      description: "{ 'uploading': " + "Test.jpg" + " }"
    };

    var task = session.uploadFile(file, request)
    task.on("progress", this.logEvent);
    task.on("error", this.logEvent);
    task.on("complete", this.logEvent);






  }


  logEvent(e) {
    console.log("----------------");
    console.log('Status: ' + e.eventName);
    // console.log(e.object);
    if (e.totalBytes !== undefined) {
      console.log('current bytes transfered: ' + e.currentBytes);
      console.log('Total bytes to transfer: ' + e.totalBytes);
    }
  }


}
