import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { PreventionComponent } from './prevention/prevention.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'map',
                component: MapComponent
            },
            {
                path: 'prevention',
                component: PreventionComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }