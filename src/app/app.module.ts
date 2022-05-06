import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './Components/landing/landing.component';
import { EngineComponent } from './Components/engine/engine.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { StateModalComponent } from './Components/state-modal/state-modal.component';

@NgModule({
  declarations: [AppComponent, LandingComponent, EngineComponent, LoaderComponent, StateModalComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
