import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared';
import { SpinnerComponent } from './admin';
import * as $ from 'jquery';
import { environment } from '../environments/environment';
import { ConfigService } from './core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from './core/services/data.service';
import {AuthenService} from './core/services/authen.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrConfig, ToastrModule } from "ngx-toastr";

// Load Config
export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
      // maxOpened: 2
    })
  ],
  providers: [
    DataService,
    AuthenService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
