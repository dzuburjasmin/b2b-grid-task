import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainGridComponent } from './main-grid/main-grid.component';
import { HttpLayerService } from './services/http-layer.service';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    MainGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DxDataGridModule
  ],
  providers: [HttpLayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
