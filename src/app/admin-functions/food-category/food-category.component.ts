import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import {
  AddEvent,
  GridDataResult,
  CellClickEvent,
  CellCloseEvent,
  SaveEvent,
  CancelEvent,
  GridComponent,
  RemoveEvent,
} from "@progress/kendo-angular-grid";

import { State, process } from "@progress/kendo-data-query";

import { Keys } from "@progress/kendo-angular-common";

import { FoodCategory } from './food-category-data';
import { CategoryService } from './edit-category.service';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.component.html',
  styleUrls: ['./food-category.component.scss'],
  providers: [CategoryService],
})
export class FoodCategoryComponent implements OnInit{
  public view?: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 5,
  };

  public changes = {};

  constructor(
    private formBuilder: FormBuilder,
    public categoryService: CategoryService
  ) {}

  public ngOnInit(): void {
    this.view = this.categoryService.pipe(
      map((data) => process(data, this.gridState))
    );

    this.categoryService.read();
  }
  public onStateChange(state: State): void {
    this.gridState = state;

    this.categoryService.read();
  }

  public cellClickHandler(args: CellClickEvent): void {
    if (!args.isEdited) {
      args.sender.editCell(
        args.rowIndex,
        args.columnIndex,
        this.createFormGroup(args.dataItem)
      );
    }
  }
  public cellCloseHandler(args: CellCloseEvent): void {
    const { formGroup, dataItem } = args;

    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      args.preventDefault();
    } else if (formGroup.dirty) {
      if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
        return;
      }

      this.categoryService.assignValues(dataItem, formGroup.value);
      this.categoryService.update(dataItem);
    }
  }

  public addHandler(args: AddEvent): void {
    args.sender.addRow(this.createFormGroup(new FoodCategory()));
  }

  public cancelHandler(args: CancelEvent): void {
    args.sender.closeRow(args.rowIndex);
  }
  public saveHandler(args: SaveEvent): void {
    if (args.formGroup.valid) {
      this.categoryService.create(args.formGroup.value);
      args.sender.closeRow(args.rowIndex);
    }
  }

  public removeHandler(args: RemoveEvent): void {
    this.categoryService.remove(args.dataItem);

    args.sender.cancelCell();
  }
  public saveChanges(grid: GridComponent): void {
    grid.closeCell();
    grid.cancelCell();

    this.categoryService.saveChanges();
  }

  public cancelChanges(grid: GridComponent): void {
    grid.cancelCell();

    this.categoryService.cancelChanges();
  }
  public createFormGroup(dataItem: FoodCategory): FormGroup {
    return this.formBuilder.group({
      
      categoryId: dataItem.menuCategoryId,
      categoryName: [dataItem.categoryName, Validators.required],
      
    });
  }

}
