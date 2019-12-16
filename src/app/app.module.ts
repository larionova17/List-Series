import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TableSeriesComponent} from './table-series/table-series.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SerialService} from './series.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {LayoutModule} from '@angular/cdk/layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const  routes = [
  {path: '', redirectTo: '/series', pathMatch: 'full'},
  {path: 'series', component: TableSeriesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TableSeriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    NgxPaginationModule,
    LayoutModule,
    MatTableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [SerialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
