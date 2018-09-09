import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonalLoanModule } from './personal-loan/personal-loan.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PersonalLoanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
