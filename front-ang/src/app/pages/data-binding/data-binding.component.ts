import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
})
export class DataBindingComponent implements OnInit {
  name = '';
  revName = '';
  checked: boolean = false;
  ifElse: boolean = false;
  constructor() { }

  ngOnInit() { }

  listen(message) {
    console.log('message', message);
    this.name = message;
    this.revName = message
      .split('')
      .reverse()
      .join('');
  }
}
