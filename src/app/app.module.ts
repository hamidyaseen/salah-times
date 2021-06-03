import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SecondbarComponent } from './secondbar/secondbar.component';
import { ThirdbarComponent } from './thirdbar/thirdbar.component';
import { FourthbarComponent } from './fourthbar/fourthbar.component';
import { ImporterModule } from './importer/importer.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopbarComponent,
    SecondbarComponent,
    ThirdbarComponent,
    FourthbarComponent
  ],
  imports: [
    BrowserModule,    
    ImporterModule,
    AppRoutingModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
