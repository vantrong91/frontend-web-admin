import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ThemeModule } from '../theme/theme.module';
import { MainRoutingModule } from './main.routing';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule.forRoot(),
    MainRoutingModule,
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule { }
