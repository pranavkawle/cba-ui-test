import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string>(null);

  constructor() { }

  setError(message: string): void {
    this.errorSubject.next(message);
  }

  getError(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  clearError() {
    this.errorSubject.next(null);
  }
}
