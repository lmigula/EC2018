import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";


import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { PositionComponent } from "./feature/position/position.component";
import { HomeComponent } from "./pages/home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { InvoiceListComponent } from "./pages/invoice-list/invoice-list.component";
import { MaterialModule } from "./material.module";
import { DatabaseService } from "./services/database.service";
import {
  registerLocaleData,
  LocationStrategy,
  DatePipe,
  CurrencyPipe,
  HashLocationStrategy
} from "@angular/common";
import localeDE from "@angular/common/locales/de";
import { DataBindingComponent } from "./pages/data-binding/data-binding.component";

import { FlexLayoutModule } from '@angular/flex-layout';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { ParentComponent } from './pages/parent/parent.component';
import { ChildComponent } from './feature/child/child.component';

registerLocaleData(localeDE, "de");

@NgModule({
  declarations: [
    AppComponent,
    PositionComponent,
    HomeComponent,
    InvoiceListComponent,
    DataBindingComponent,
    InvoiceDetailComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: "de"
    },
    DatabaseService,
    DatePipe,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
