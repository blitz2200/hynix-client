import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleChartComponent } from './example-chart/example-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { MemoryComponent } from './memory/memory.component';
import { ProcessingComponent } from './processing/processing.component';
import { ResultComponent } from './result/result.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    ExampleChartComponent,
    MemoryComponent,
    ProcessingComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
