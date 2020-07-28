import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/api/data.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { State } from 'src/app/shared/models/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, private mediaObserver: MediaObserver) { }
  deviceXs: boolean;
  data:any;
  mediaSub: Subscription;

  // styling: any = {
  //   "red": {
  //     "height": "188px",
  //     "width": "350px",
  //     "border-color": "#FF3D00"
  //   },
  //   "orange" : {
  //     "height": "188px",
  //     "width": "350px",
  //     "border-color": "#FD7014"
  //   },
  //   "green" : {
  //     "height": "188px",
  //     "width": "350px",
  //     "border-color": "#5FFD14"
  //   },
  //   "red_sm": {
  //     "height": "84px",
  //     "width": "170px",
  //     "border-color": "#FF3D00"
  //   },
  //   "orange_sm" : {
  //     "height": "84px",
  //     "width": "170px",
  //     "border-color": "#FD7014"
  //   },
  //   "green_sm" : {
  //     "height": "84px",
  //     "width": "170px",
  //     "border-color": "#5FFD14"
  //   }
  // } 
  
  statewiseData: State[] = [];

  confirmedObj;
  deltaConfirmedObj;
  recoveredObj;
  deltaRecoveredObj;
  deathsObj;
  deltaDeathsObj;

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      ( (this.deviceXs = result.mqAlias === 'lg') || (this.deviceXs = result.mqAlias === 'xl') ) ? true : false;
    })
    this.dataService.getStatewiseData()
    .subscribe((data:any) => {
      data.statewise.forEach((stateData:State) => {
        this.statewiseData.push(stateData);
      });
      
      this.confirmedObj = {
        "title": "Confirmed cases",
        "count": this.numberWithCommas(this.statewiseData[0].confirmed),
        "style": {"border-color": "#FF3D00"}
      }
      this.deltaConfirmedObj = {
        "title": "Confirmed cases increase",
        "count": this.numberWithCommas(this.statewiseData[0].deltaconfirmed),
        "style": {"border-color": "#FF3D00"}
      }
      this.recoveredObj = {
        "title": "Recovered cases",
        "count": this.numberWithCommas(this.statewiseData[0].recovered),
        "style": {"border-color": "#5FFD14"}
      }
      this.deltaRecoveredObj = {
        "title": "Recovered cases increase",
        "count": this.numberWithCommas(this.statewiseData[0].deltarecovered),
        "style": {"border-color": "#5FFD14"}
      }
      this.deathsObj = {
        "title": "Deceased cases",
        "count": this.numberWithCommas(this.statewiseData[0].deaths),
        "style": {"border-color": "#7D8B9A"}
      }
      this.deltaDeathsObj = {
        "title": "Deceased cases increase",
        "count": this.numberWithCommas(this.statewiseData[0].deltadeaths),
        "style": {"border-color": "#7D8B9A"}
      }

      console.log(this.statewiseData);
    }, (error:any) => {
      console.log(error);
    })
  }
}
