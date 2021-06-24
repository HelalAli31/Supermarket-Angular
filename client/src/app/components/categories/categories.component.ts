import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/service/categoryService/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Output() categoryIdEvent = new EventEmitter<string>();
  public categories: any;
  public subscription: Subscription;
  public limit: number = 6;
  public from: number = 0;

  constructor(private categoryService: CategoryService) {
    this.categories = [];
    this.subscription = this.categoryService
      .UpdateObservable()
      .subscribe(async (value: any) => {
        await this.getcategories();
        this.subscription.unsubscribe();
        console.log('Unsubsicribe');
      });
  }

  ngOnInit(): void {
    this.getcategories();
  }

  async getcategories() {
    this.categories = await this.categoryService.getCategories(
      this.limit,
      this.from
    );
  }
  async prevCate() {
    if (this.from === 0) return;
    this.from = this.from - 1;
    await this.getcategories();
  }
  async nextCate() {
    if (this.categories.length < this.limit) return;
    this.from = this.from + 1;
    await this.getcategories();
  }
  getCategoryId(id: string) {
    this.categoryIdEvent.emit(id);
  }
}
