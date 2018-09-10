import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonalLoanComponent } from './personal-loan/personal-loan.component';
import { PersonalLoanApplicationComponent } from './personal-loan/personal-loan-application/personal-loan-application.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/personal-loan', pathMatch: 'full' },
  { path: '**', redirectTo: '/personal-loan', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
