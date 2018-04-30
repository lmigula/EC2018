import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { DataBindingComponent } from './pages/data-binding/data-binding.component';
import { ParentComponent } from './pages/parent/parent.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'binding', component: DataBindingComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'invoiceList', component: InvoiceListComponent },
  { path: 'invoiceDetail', component: InvoiceDetailComponent },
  { path: 'invoiceDetail/:id', component: InvoiceDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
