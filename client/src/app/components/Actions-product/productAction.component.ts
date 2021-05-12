import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/categoryService/category.service';

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
export class productActionsComponent implements OnInit, OnChanges {
  @Input() product: any;
  @Input() actionTypeIsAdd: any;
  @Output() addNewProductEvent = new EventEmitter<IProduct>();
  @Output() updateProductEvent = new EventEmitter<IProduct>();
  public productForm: any;
  public mealNameErrors: Array<string>;
  public categoryArray: any;
  public ActionName: string;
  public SelectedCategory: any;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryArray = [];
    this.ActionName = 'Add';
    this.mealNameErrors = [];
    this.productForm = this.formBuilder.group({
      productName: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(1),
      ]),
      productImage: new FormControl('', [Validators.required]),
      productPrice: new FormControl(0, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      productDescription: new FormControl('', [Validators.required]),
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
    this.product = [];
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
  }
}
