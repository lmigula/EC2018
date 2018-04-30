import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  public data: any;
  public list = [
    { id: 1, amount: 12000.34, innerValue: 'inner Value 1' },
    { id: 2, amount: 34.34, innerValue: 'inner Value 2' }
  ];

  constructor() { }

  ngOnInit() {
  }

  showDetailsParent(data: any) {
    console.log('detailsParent:', data);
    this.data = data;
  }
}
