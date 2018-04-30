import { Injectable } from '@angular/core';
import * as v4 from 'uuid/v4';
import * as faker from 'faker';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DatabaseService {
  basePath = '/api/';
  constructor(private http: Http) { }
  list = [];
  handleError(error) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }

  getList() {
    this.list = [];
    for (let i = 0; i < 100; i++) {
      this.list.push({
        id: v4(),
        name: faker.name.findName(),
        customer: faker.company.companyName(),
        amount: Math.round(Math.random() * 10000000) / 100
      });
    }
    return this.list;
  }

  getInvoice(id: string) {
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.basePath + 'invoices/' + id, options);

  }

  getRemoteList() {
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.basePath + 'invoices', options);
  }


  saveInvoice(invoice) {
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });

    return this.http.patch(this.basePath + 'invoices', invoice, options);
  }

  openPdf(id) {
    window.open(this.basePath + 'invoicePdf/' + id, "_blank");
  }
}
