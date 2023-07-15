import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopularComponent } from './popular/popular.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { TableReservationComponent } from './table-reservation/table-reservation.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {  DateInputModule, DatePickerModule } from '@progress/kendo-angular-dateinputs';
// import {  InputsModule,  } from '@progress/kendo-angular-inputs';
// import { TimePickerModule } from '@progress/kendo-angular-dateinputs';
// import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { FormFieldModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { AvailableTablesComponent } from './available-tables/available-tables.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule  ,HttpClientJsonpModule} from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {   ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import {  NgChartsModule } from 'ng2-charts';
import { ChartModule } from 'primeng/chart';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table'; 
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { KnobModule } from 'primeng/knob';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { AdminLogInComponent} from './admin-log-in/admin-log-in.component';
import { CardModule } from 'primeng/card';
import { Sidebar } from 'primeng/sidebar';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { GridModule } from '@progress/kendo-angular-grid';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { AdminRestrictedComponent } from './admin-restricted/admin-restricted.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { AdminDashboardComponent } from './dashboard copy/dashboard.component';
import { SalesRatioComponent } from './dashboard copy/dashboard-components/sales-ratio/sales-ratio.component';
import { FeedsComponent } from './dashboard copy/dashboard-components/feeds/feeds.component';
import { CustomerDetailsComponent } from './dashboard copy/dashboard-components/customer-details/customer-details.component';
import { TopCardsComponent } from './dashboard copy/dashboard-components/top-cards/top-cards.component';
import { BlogCardsComponent } from './dashboard copy/dashboard-components/blog-cards/blog-cards.component';
import { FoodItemComponent } from './admin-functions/food-item/food-item.component';
import { DashboardModule } from './dashboard copy/dashboard.module';
import { EditService } from './admin-functions/food-item/edit.service';
import { CategoryService } from './admin-functions/food-category/edit-category.service';








@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    PopularComponent,
    TestimonialComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    TableReservationComponent,
    ReservationFormComponent,
    AvailableTablesComponent,
    ConfirmDialogComponent,
  
    UserLogInComponent,
    AdminLogInComponent,

    AdminResetPasswordComponent,
    AdminRestrictedComponent,

   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    ButtonModule,
    ImageModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IntlModule,
    LabelModule,
    ButtonsModule,
    DateInputsModule,
    FormFieldModule,
    HttpClientModule, 
    ConfirmDialogModule,
    ToastModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    NgChartsModule,
    ChartModule,
    MatCardModule,
  MatChipsModule,
  MatTabsModule,
  MatGridListModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  TablerIconsModule.pick(TablerIcons),
  KnobModule,
  ProgressSpinnerModule,
  PaginatorModule,
  DialogModule,
  PasswordModule,
  CardModule,
  GridModule,
  TableModule,
  MenuModule,
  NgOtpInputModule,
  NgbModule,
  RouterModule.forRoot(routes, {useHash:false}),
  DashboardModule,
  ],
  exports:[  TablerIconsModule
  ],
  providers: [ConfirmationService,
    MessageService,DialogService,
    EditService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
