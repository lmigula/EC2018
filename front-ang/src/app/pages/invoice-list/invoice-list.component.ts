import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit {
  list: Array<any>;
  data: any;
  constructor(private dbService: DatabaseService) {
    // this.list = listService.getList();
    this.getRemoteList();
  }

  ngOnInit() { }
  showDetails(data: any) {
    this.data = data;
  }
  getRemoteList() {
    this.dbService.getRemoteList().subscribe(data => {
      let jsonBody = JSON.parse(data['_body']);
      console.log('jsonBody', jsonBody);
      if (jsonBody['resultList']) {
        this.list = <any>jsonBody['resultList'];
      } else {
        this.list = <any>jsonBody;
      }
      console.log('list', this.list);
    });
  }
}
