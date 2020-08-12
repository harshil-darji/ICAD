import { Component, OnInit, ViewChild } from '@angular/core';

import { Options } from "highcharts";
import Highcharts from 'highcharts/highmaps';
import worldMap from "@highcharts/map-collection/countries/in/in-all.geo.json";
import { DataService } from '../services/api/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private dataService: DataService) { }

  displayedColumns: string[] = ['name', 'confirmed', 'recoveries', 'deaths'];
  dataSource;
  tableData = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  async getStatewiseData() {
    const statewiseData = this.dataService.getStatewiseData()
      .subscribe((data: any) => {
        data.statewise.forEach(state => {
          // Code for map stats
          if (state.statecode != "GJ") {
            var stateArray = ['in-' + state.statecode.toString().toLowerCase(), state.confirmed];
            this.mapData.push(stateArray);
            // Code for table stats
            this.tableData.push({name: state.state, confirmed: state.confirmed, recoveries: state.recovered, deaths: state.deaths});
          }
          else {
            this.mapData.push(['in-2984', state.confirmed]);
          }
        });
        // console.log(this.mapData);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
      }, (error: any) => {
        console.log(error);
      }, () => this.showChart())
  }

  ngOnInit(): void {
    const waitForStatewiseData = this.getStatewiseData();
  }

  showChart() { this.contentReady = true; };

  contentReady: boolean = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  // chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];
  mapData = [];

  chartOptions: Options = {
    chart: {
      map: worldMap as any,
      backgroundColor: "#1E2124",
      height: '780px'
    },
    title: {
      text: "Confirmed COVID cases by state",
      style: {
        color: '#FFF'
      }
    },
    // subtitle: {
    //   text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/in/in-all.js">India</a>',
    //   style: {
    //     color: '#FFF'
    //   }
    // },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
        align: "right"
      }
    },
    legend: {
      enabled: true,
      title: {
        style: { color: '#FFF' },
        text: 'Confirmed COVID Cases'
      }
    },
    colorAxis: {
      stops: [
        [0, '#7bc043'],
        [0.007, '#fdf498'],
        [0.30, '#f37736'],
        [0.99, '#ee4035']
      ],
      min: 1000,
      tickInterval: 200000,
      max: 500000,
    },
    series: [
      {
        type: "map",
        name: "COVID Cases",
        cursor: 'pointer',
        borderWidth: 0.5,
        states: {
          hover: {
            color: "#777777"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: this.mapData as any,
        tooltip: {
          // headerFormat: '<span style="font-size: small; font-weight: bold">{point}</span><br>',
          pointFormat: '<span style="font-weight: bold">Confirmed</span>: {point.value}'
        }
      }
    ],
    credits: {
      enabled: false
    },
  };
}
