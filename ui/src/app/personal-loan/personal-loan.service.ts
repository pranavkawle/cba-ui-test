import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { PersonalLoan } from './personal-loan';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PersonalLoanService {
  private readonly url: string;
  private personalLoanSubject = new BehaviorSubject(null);
  private personalLoanCountSubject = new BehaviorSubject(0);

  constructor(private http: HttpClient) {
    this.url = `${Constants.baseUrl}/personal-loan`;
  }

  get(name?: string): Observable<PersonalLoan> {
    if (name) {
      return this.http.get<PersonalLoan>(`${this.url}/${name}`);
    }
    return of(null);
  }

  getAll(): Observable<Array<PersonalLoan>> {
    return this.http.get<Array<PersonalLoan>>(this.url);
  }

  add(personalLoan: PersonalLoan): Observable<{ isSuccess: boolean }> {
    return this.http.post<{ isSuccess: boolean }>(this.url, personalLoan);
  }

  setPersonalLoan(personalLoan: PersonalLoan): void {
    this.personalLoanSubject.next(personalLoan);
  }

  getPersonalLoan(): Observable<PersonalLoan> {
    return this.personalLoanSubject.asObservable();
  }

  setPersonalLoanCount(count: number): void {
    this.personalLoanCountSubject.next(count);
  }

  getPersonalLoanCount(): Observable<number> {
    return this.personalLoanCountSubject.asObservable();
  }
}
