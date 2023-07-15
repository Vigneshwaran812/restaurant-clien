import { Component, OnInit } from '@angular/core';
import { GridDataResult, GridModule, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DashboardService } from 'app/Services/dashboard.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  //providers:[GridModule]
})
export class ReviewComponent implements OnInit {
  reviews !: any[];

  ngOnInit() {
    this.fetchReviews();
  }


  constructor(private dashboardService: DashboardService){}

  fetchReviews() {

    //this.reviewService.getReviews() 
    this.dashboardService.getReviews().subscribe(
      (response: any) => {
        this.reviews = response.Data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
}
