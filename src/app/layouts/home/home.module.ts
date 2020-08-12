import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from 'src/app/map/map.component';
import { PreventionComponent } from 'src/app/prevention/prevention.component';
import { NgxGlideModule } from 'ngx-glide';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    MapComponent,
    PreventionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoreModule,
    HighchartsChartModule,    
    NgxGlideModule    
  ]
})
export class HomeModule { }
