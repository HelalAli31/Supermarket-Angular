import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productActionsComponent } from './components/Actions-product/productAction.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'product_page',
    component: ProductComponent,
    canActivate: [AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'products/:cartId',
    component: ProductsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'ProductActions',
    component: productActionsComponent,
    canActivate: [AdminGuard],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
