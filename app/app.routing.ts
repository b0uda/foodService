import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FoodDetailComponent } from "./food-detail/food-detail.component";




const routes: Routes = [
    { path: "", redirectTo: "details/10", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "details/:id", component: FoodDetailComponent }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }