import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private mediaObserver: MediaObserver) { }
  deviceXs: boolean;
  mediaSub: Subscription;

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      // console.log(result.mqAlias);
      ( (this.deviceXs = result.mqAlias === 'sm') || (this.deviceXs = result.mqAlias === 'xs') ) ? true : false;
    })
  }
}
