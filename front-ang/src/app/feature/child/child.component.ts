import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {


  @Input() position: any;

  @Output() showDetailsComp = new EventEmitter<any>();

  details() {
    console.log('show Details', this.position);
    this.showDetailsComp.emit(this.position.innerValue);
  }
  constructor() { }

  ngOnInit() {
  }

}
