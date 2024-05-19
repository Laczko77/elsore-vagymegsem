import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProductComponent } from '../product/product.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {path: 'product/:id', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }