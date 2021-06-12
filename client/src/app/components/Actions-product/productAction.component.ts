import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/categoryService/category.service';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/service/productService/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../PopUpComponents/dialog/dialog.component';
import { CategoryPopUpComponent } from '../PopUpComponents/category_dialog/category-pop-up/category-pop-up.component';
import { CategoryFormComponent } from '../PopUpComponents/category_dialog/category-form/category-form.component';

interface IProduct {
  _id?: string;
  title: string;
  filename?: string;
  category: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-productAction',
  templateUrl: './productAction.component.html',
  styleUrls: ['./productAction.component.css'],
})
export class productActionsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() product: any;
  @Output() addNewProductEvent = new EventEmitter<IProduct>();
  @Output() updateProductEvent = new EventEmitter<IProduct>();
  public productForm: any;
  public mealNameErrors: Array<string>;
  public categoryArray: any;
  public ActionName: string;
  public SelectedCategory: any;
  public subscription: Subscription;
  public resultStatus: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductsService,
    public dialog: MatDialog
  ) {
    this.subscription = this.productService
      .getProductActionResult()
      .subscribe((value: any) => {
        const dialogRef = this.dialog.open(DialogComponent, {
          data: { value },
        });
        this.subscription.unsubscribe();
        console.log('Unsubsicribe');
        this.resultStatus = '';
      });
    this.subscription = this.categoryService
      .UpdateObservable()
      .subscribe((value: any) => {
        const dialogRef = this.dialog.open(DialogComponent, {
          data: { value },
        });
        this.subscription.unsubscribe();
      });

    this.categoryArray = [];
    this.ActionName = 'Add';
    this.mealNameErrors = [];
    this.productForm = this.formBuilder.group({
      productName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      productImage: new FormControl(''),
      productPrice: new FormControl(0, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      productDescription: new FormControl(''),
    });
  }

  async categoryForm() {
    const category = this.categoryArray;
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: { category },
    });
  }

  ActionProduct() {
    this.mealNameErrors = [];
    this.collectErrors();
    const formInvalid = this.productForm.status === 'INVALID';
    if (formInvalid) return;
    const newProduct: IProduct = {
      _id: this.product?._id,
      description: this.productForm.get('productDescription').value,
      title: this.productForm.get('productName').value.toLowerCase(),
      price: this.productForm.get('productPrice').value,
      filename: this.productForm.get('productImage').value,
      category: this.productForm.get('category').value,
    };

    this.product == undefined ? delete newProduct._id : newProduct;
    this.product
      ? this.updateProductEvent.emit(newProduct)
      : this.addNewProductEvent.emit(newProduct);
  }
  collectErrors() {
    const errors = this.productForm.get('productName').errors;
    if (!errors) return;
    this.mealNameErrors = Object.keys(
      this.productForm.get('productName').errors
    );
  }

  async getCategories() {
    this.categoryArray = await this.categoryService.getCategories();
  }

  async ngOnInit() {
    await this.getCategories();
    this.SelectedCategory = this.categoryArray;
  }
  resetProduct() {
    this.productForm.reset();
    this.product = null;
    this.ActionName = 'Add';
  }

  ngOnChanges() {
    if (this.product) {
      this.ActionName = 'Edit';
      this.SelectedCategory = this.product['category']._id;

      this.productForm.setValue({
        productName: this.product['title'],
        category: this.product['category'],
        productDescription: this.product['description'],
        productPrice: this.product['price'],
        productImage: this.product['filename'],
      });
    }
    this.subscription = this.productService
      .getProductActionResult()
      .subscribe((value: any) => {
        this.resultStatus = value;
        setTimeout(() => {
          this.subscription.unsubscribe();
          this.resultStatus = '';
        }, 2000);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
