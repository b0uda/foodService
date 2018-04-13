import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { FoodService } from "./food.service";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { DropDownModule } from "nativescript-drop-down/angular";

import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
import { FoodDetailComponent } from "./food-detail/food-detail.component";
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import { registerElement } from 'nativescript-angular/element-registry';
registerElement('StarRating', () => require('nativescript-star-ratings').StarRating);

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        DropDownModule,
        NativeScriptHttpClientModule,


    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FoodDetailComponent,
    ],
    providers: [
        FoodService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {

}
