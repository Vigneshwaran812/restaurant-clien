import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { AdminDashboardComponent } from "./dashboard.component";
import { SalesRatioComponent } from "./dashboard-components/sales-ratio/sales-ratio.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { CustomerDetailsComponent } from "./dashboard-components/customer-details/customer-details.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { BlogCardsComponent } from "./dashboard-components/blog-cards/blog-cards.component";


import {  GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { FoodItemComponent } from "app/admin-functions/food-item/food-item.component";
import { DiningTableComponent } from "app/admin-functions/dining-table/dining-table.component";
import { ComponentsRoutes } from "app/admin-functions/admin-functions.routing";
import { ReviewComponent } from "app/admin-functions/review/review.component";
import { CarouselModule } from 'primeng/carousel';

import { CardModule } from "primeng/card";
import { FoodCategoryComponent } from "app/admin-functions/food-category/food-category.component";




const routes: Routes = [
  {
    path: 'dashboard',
    data: {
      title: "Dashboard",
    },
     component: AdminDashboardComponent,
  }
]

//   // children : [

//   //   {path : 'food-item' , component: FoodItemComponent}
//   //   // loadChildren : ()=>
//   //   //   import ('../admin-functions/admin-functions.module').then((m)=>m.AdminFunctionModule)

//   // ]
    
    
//   },
  // {
  //   path: "dining-table",
 
  //   component: DiningTableComponent,
  
  //   // children : [
  //   //   {
  //   //     path: "dining-table",
  //   //     component : DiningTableComponent,
  //   //   },

  //   // ]
    
    
  // },


//   {path : '',
//   component:FullComponent,
//   canActivate :[authguardGuard],
//   data : { role: 'Admin' },
//   children : [
//     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//     {
//       path:'dashboard',
//       loadChildren : ()=>
//       import ('./dashboard copy/dashboard.module').then((m)=>m.DashboardModule)
//     },
//     {
//       path:'admin-functions',
//       loadChildren : ()=>
//       import ('./admin-functions/admin-functions.module').then((m)=>m.AdminFunctionModule)
//     },
    
//   ],
// },
  
  // {
  //   path: "dining-table",
  //   component : FoodItemComponent,
  // },
  // {
  //   path: "order-details",
  //   component : BlogCardsComponent,
  // },
  // {
  //   path: "reviews",
  //   component : BlogCardsComponent,
  // }


//];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    GridModule,
    CarouselModule,
    CardModule
  
  ],

  declarations: [
    AdminDashboardComponent,
    SalesRatioComponent,
    FeedsComponent,
    CustomerDetailsComponent,
    TopCardsComponent,
    BlogCardsComponent,
    FoodItemComponent,
    DiningTableComponent,
    ReviewComponent,
    FoodCategoryComponent
  ],
  //bootstrap : [CustomerDetailsComponent]
})
export class DashboardModule {}
