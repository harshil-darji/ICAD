import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/api/data.service';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { State } from 'src/app/shared/models/state';
import { Metric } from 'src/app/shared/models/metric';
import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0}),
        animate(1000, style({opacity:1})) 
      ]),
    ])
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private dataService: DataService, private mediaObserver: MediaObserver) { }
  deviceXs: boolean;
  data: any;
  mediaSub: Subscription;
  showPageOne: boolean = true;
  contentReady: boolean = false;

  showArrows = true;
  arrowLeftLabel = "<";
  arrowRightLabel = ">"; 
  perView = 1;
  autoplay = false;

  //National metrics
  totalStats: any;
  metaStats: any;
  deltaStats: any;
  TTStats: any;
  totalTested: number = 0;

  // Page 1 ects
  confirmed;
  deltaConfirmed;
  recovered;
  deltaRecovered;
  deaths;
  deltaDeaths;

  // Page 2 ects
  confirmedPm;
  recoveryRatio;
  caseFatalityRatio;
  activeRatio;
  totalTestsPerformed;
  avgGrowthRate;

  ngOnInit() {
    const waitForStatewiseData = this.getStatewiseData();
  }

  getStatewiseData() {
    const statewiseData = this.dataService.getStatewiseData()
    .subscribe((data: any) => {
      this.TTStats = data.statewise[0];

      this.avgGrowthRate = ((Math.round(((((data.cases_time_series[data.cases_time_series.length - 1].totalconfirmed - data.cases_time_series[data.cases_time_series.length - 8].totalconfirmed) / data.cases_time_series[data.cases_time_series.length - 8].totalconfirmed) * 100) / 7) * 10) / 10) + " %").toString();

      this.totalTestsPerformed = {
        "title": "Total tests performed",
        "description": "These many samples were tested",
        "count": this.numberWithCommas(data.tested[data.tested.length - 1].totalsamplestested).toString(),
        "style": { "border-color": "#3E39AE" }
      }
    }, (error:any) => {
      console.log(error);
    }, () => {
      this.getMetricsData();
    })
  }

  async getMetricsData() { 
    this.dataService.getMetricsData()
    .subscribe((data: Metric[]) => {

      console.log(data);

      this.deltaStats = data["TT"].delta;
      this.metaStats = data["TT"].meta;
      this.totalStats = data["TT"].total;

      // For page 1
      this.confirmed = {
        "title": "Confirmed cases",
        "description": "Total number of confirmed cases",
        "count": this.numberWithCommas(this.totalStats.confirmed),
        "style": { "border-color": "#FF3D00" }
      }
      this.deltaConfirmed = {
        "title": "Confirmed cases increase",
        "description": "Confirmed cases increased compared to yesterday",
        "count": this.numberWithCommas(this.deltaStats.confirmed),
        "style": { "border-color": "#FF3D00" }
      }
      this.recovered = {
        "title": "Recovered cases",
        "description": "Total number of cases that recovered! :)",
        "count": this.numberWithCommas(this.totalStats.recovered),
        "style": { "border-color": "#5FFD14" }
      }
      this.deltaRecovered = {
        "title": "Recovered cases increase",
        "description": "Number of recovered cases increased compared to yesterday",
        "count": this.numberWithCommas(this.deltaStats.recovered),
        "style": { "border-color": "#5FFD14" }
      }
      this.deaths = {
        "title": "Deceased cases",
        "description": "Total number of deaths caused",
        "count": this.numberWithCommas(this.totalStats.deceased),
        "style": { "border-color": "#7D8B9A" }
      }
      this.deltaDeaths = {
        "title": "Deceased cases increase",
        "description": "",
        "count": this.numberWithCommas(this.deltaStats.deceased),
        "style": { "border-color": "#7D8B9A" }
      }

      // For page 2
      this.confirmedPm = {
        "title": "Confirmed Per Million",
        "count": this.numberWithCommas((Math.round(((this.totalStats.confirmed / this.metaStats.population) * Math.pow(10, 6)) * 10) / 10).toString()),
        "style": { "border-color": "#FF3D00" }
      }
      this.confirmedPm.description = this.confirmedPm.count.toString() + " out of every 1 million people tested positive for COVID";

      this.recoveryRatio = {
        "title": "Recovery Ratio",
        "count": ((Math.round((this.totalStats.recovered / this.totalStats.confirmed * 100) * 10) / 10) + " %").toString(),
        "style": { "border-color": "#5FFD14" }
      }
      this.recoveryRatio.description = "For every 100 confirmed cases, ~" + this.recoveryRatio.count.toString() + " have recovered from the virus";

      this.caseFatalityRatio = {
        "title": "Case Fatality Ratio",
        "count": ((Math.round((this.totalStats.deceased / this.totalStats.confirmed * 100) * 10) / 10) + " %").toString(),
        "style": { "border-color": "#7D8B9A" }
      }
      this.caseFatalityRatio.description = "For every 100 confirmed cases, ~" + this.caseFatalityRatio.count.toString() + " have passed away due to the virus";
      this.activeRatio = {
        "title": "Active Ratio",
        "count": ((Math.round(((this.TTStats.active / this.totalStats.confirmed) * 100) * 10) / 10) + " %").toString(),
        "style": { "border-color": "#FF3D00" }
      }
      this.activeRatio.description = "For every 100 confirmed cases, ~" + this.activeRatio.count.toString() + " are currently infected";

      // testsPm
      this.avgGrowthRate = {
        "title": "Average Growth Rate",
        "count": this.numberWithCommas(this.avgGrowthRate),
        "style": { "border-color": "#7D8B9A" }
      }
      this.avgGrowthRate.description = "In the last one week, the number of new infections has grown by an average of " + this.avgGrowthRate.count.toString() + " every day";

      this.contentReady = true;
      
    }, (error: any) => {
      console.log(error);
    })
  }

  ngAfterViewInit(): void {
    
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  }

  togglePage() {
    this.showPageOne = !this.showPageOne;
  }
}
