import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() position: any;
  constructor() { }

  ngOnInit() {
    if (!this.position.value) {
      this.position.value = this.position;
    }
    console.log('init', this.position);
  }
  @Output() showDetails = new EventEmitter<any>();
  details() {
    console.log('show Details', this.position);
    this.showDetails.emit(this.position);
  }
}
