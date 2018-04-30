import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice'
import { InvoicePosition } from '../../models/position'

import { DatePipe } from '@angular/common';
import { DatabaseService } from '../../services/database.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource
} from '@angular/material';


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: Invoice;
  id: string;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns = [
    'description',
    'amount',
    'singlePrice',
    'sum',
    'delete'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dbService: DatabaseService,
  ) {

  }

  ngOnInit() {
    this.invoice = new Invoice();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {

        this.dbService.getInvoice(this.id)
          .subscribe(data => {
            let jsonBody = JSON.parse(data['_body']);
            console.log('jsonBody', jsonBody)
            this.invoice = jsonBody;
            this.dataSource.data = this.invoice.positon;
          });
      } else {

        this.invoice.amount = 123.45;
        this.invoice.date = new Date();
        this.invoice.positon = new Array<InvoicePosition>();
        let newPost = new InvoicePosition();
        newPost.amount = 0;
        newPost.singlePrice = 0.00;
        this.invoice.positon.push(newPost);
        this.dataSource.data = this.invoice.positon;
      }


    });
  }

  addPosition() {
    console.log('addPos');
    let newPost = new InvoicePosition();
    newPost.amount = 0;
    newPost.singlePrice = 0.00;
    this.invoice.positon.push(newPost);
    this.dataSource.data = this.invoice.positon;

  }

  deletePosition(position, index) {
    this.invoice.positon.splice(index, 1);
    this.dataSource.data = this.invoice.positon;
  }

  getSum() {
    let result = 0;
    if (this.invoice.positon) {
      this.invoice.positon.forEach(element => {
        result += element.amount * element.singlePrice;
      });
    }
    this.invoice.amount = result;
    return this.invoice.amount;
  }

  save() {
    console.log('save this', this.invoice)
    this.dbService.saveInvoice(this.invoice)
      .subscribe(response => {
        let jsonBody = JSON.parse(response['_body']);
        let data = jsonBody;
        if (jsonBody.data) {
          data = jsonBody.data;
        }
        this.invoice['_id'] = data.id;
        this.invoice['_rev'] = data.rev;

      });
  }

  getPdf() {
    console.log('openpdf', this.invoice['_id']);
    this.dbService.openPdf(this.invoice['_id']);
  }

}
