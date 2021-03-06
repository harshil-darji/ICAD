import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './widgets/card/card.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardComponent
  ]
})
export class SharedModule { }
