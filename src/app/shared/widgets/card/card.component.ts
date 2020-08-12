import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  constructor() { }

  @Input() data;

  ngOnInit(): void {
    // console.log(this.data);
  }

  ngOnDestroy(): void {
    this.data = null;
  }

}
