import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './Components/landing/landing.component';
import { EngineComponent } from './Components/engine/engine.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { StateModalComponent } from './Components/state-modal/state-modal.component';
import { DropzoneComponent } from './Components/dropzone/dropzone.component';
import { AddCycleModalComponent } from './Components/add-cycle-modal/add-cycle-modal.component';
import { TrainModalComponent } from './Components/train-modal/train-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EngineComponent,
    LoaderComponent,
    StateModalComponent,
    DropzoneComponent,
    AddCycleModalComponent,
    TrainModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
