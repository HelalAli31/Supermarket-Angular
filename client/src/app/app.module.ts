import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { productActionsComponent } from './components/Actions-product/productAction.component';
import { MaterialModule } from './material-module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { FilterPipe } from './pipe/filter.pipe';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PopUpLoginComponent } from './components/PopUpComponents/pop-up-login/pop-up-login.component';
import { CartComponent } from './components/cart/cart.component';
import { PopUpOrderDetailsComponent } from './components/PopUpComponents/pop-up-order-details/pop-up-order-details.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { PopUpEditItemComponent } from './components/PopUpComponents/pop-up-edit-item/pop-up-edit-item.component';
import { DialogComponent } from './components/PopUpComponents/dialog/dialog.component';
import { PopUpOrderDoneComponent } from './components/PopUpComponents/pop-up-order-done/pop-up-order-done.component';
import { CategoryPopUpComponent } from './components/PopUpComponents/category_dialog/category-pop-up/category-pop-up.component';
import { CategoryFormComponent } from './components/PopUpComponents/category_dialog/category-form/category-form.component';
import { SlideImagesComponent } from './components/slide-images/slide-images.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    productActionsComponent,
    CategoriesComponent,
    HomeComponent,
    FilterPipe,
    LoginComponent,
    NotFoundComponent,
    PopUpLoginComponent,
    CartComponent,
    PopUpOrderDetailsComponent,
    SingUpComponent,
    PopUpEditItemComponent,
    DialogComponent,
    PopUpOrderDoneComponent,
    CategoryPopUpComponent,
    CategoryFormComponent,
    SlideImagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
