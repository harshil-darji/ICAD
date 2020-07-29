import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/api/data.service';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { State } from 'src/app/shared/models/state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService, private mediaObserver: MediaObserver) { }
  deviceXs: boolean;
  data: any;
  mediaSub: Subscription;
  statewiseData: State[] = [];
  showPageOne: boolean = true;

  // Page 1 objects
  confirmedObj;
  deltaConfirmedObj;
  recoveredObj;
  deltaRecoveredObj;
  deathsObj;
  deltaDeathsObj;

  // Page 2 objects
  testedObj;
  deltaTestedObj;
  activeObj;
  activeRatioObj;
  otherObj;
  fatalityRatioObj;

  ngOnInit(): void {
    this.dataService.getStatewiseData()
      .subscribe((data: any) => {
        data.statewise.forEach((stateData: State) => {
          this.statewiseData.push(stateData);
        });

        // For page 1
        this.confirmedObj = {
          "title": "Confirmed cases",
          "count": this.numberWithCommas(this.statewiseData[0].confirmed),
          "style": { "border-color": "#FF3D00" }
        }
        this.deltaConfirmedObj = {
          "title": "Confirmed cases increase",
          "count": this.numberWithCommas(this.statewiseData[0].deltaconfirmed),
          "style": { "border-color": "#FF3D00" }
        }
        this.recoveredObj = {
          "title": "Recovered cases",
          "count": this.numberWithCommas(this.statewiseData[0].recovered),
          "style": { "border-color": "#5FFD14" }
        }
        this.deltaRecoveredObj = {
          "title": "Recovered cases increase",
          "count": this.numberWithCommas(this.statewiseData[0].deltarecovered),
          "style": { "border-color": "#5FFD14" }
        }
        this.deathsObj = {
          "title": "Deceased cases",
          "count": this.numberWithCommas(this.statewiseData[0].deaths),
          "style": { "border-color": "#7D8B9A" }
        }
        this.deltaDeathsObj = {
          "title": "Deceased cases increase",
          "count": this.numberWithCommas(this.statewiseData[0].deltadeaths),
          "style": { "border-color": "#7D8B9A" }
        }

        // For page 2
        this.testedObj = {
          "title": "Tested",
          "count": this.numberWithCommas(this.statewiseData[0].confirmed),
          "style": { "border-color": "#FF3D00" }
        }
        this.testedObj = {
          "title": "Confirmed cases increase",
          "count": this.numberWithCommas(this.statewiseData[0].deltaconfirmed),
          "style": { "border-color": "#FF3D00" }
        }
        this.activeObj = {
          "title": "Recovered cases",
          "count": this.numberWithCommas(this.statewiseData[0].recovered),
          "style": { "border-color": "#5FFD14" }
        }
        this.activeRatioObj = {
          "title": "Recovered cases increase",
          "count": this.numberWithCommas(this.statewiseData[0].deltarecovered),
          "style": { "border-color": "#5FFD14" }
        }
        this.otherObj = {
          "title": "Deceased cases",
          "count": this.numberWithCommas(this.statewiseData[0].deaths),
          "style": { "border-color": "#7D8B9A" }
        }
        this.fatalityRatioObj = {
          "title": "Deceased cases increase",
          "count": this.numberWithCommas(this.statewiseData[0].deltadeaths),
          "style": { "border-color": "#7D8B9A" }
        }

        console.log(this.statewiseData);
      }, (error: any) => {
        console.log(error);
      })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
