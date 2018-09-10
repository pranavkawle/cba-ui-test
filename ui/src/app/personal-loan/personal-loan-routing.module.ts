import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PersonalLoanComponent } from './personal-loan.component';
import { PersonalLoanApplicationComponent } from './personal-loan-application/personal-loan-application.component';

const appRoutes: Routes = [
  {
    path: 'personal-loan', pathMatch: 'prefix', children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PersonalLoanComponent },
      { path: 'apply', component: PersonalLoanApplicationComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class PersonalLoanRoutingModule { }
