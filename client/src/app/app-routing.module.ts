import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productActionsComponent } from './components/Actions-product/productAction.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'product_page', component: ProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'ProductActions', component: productActionsComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
