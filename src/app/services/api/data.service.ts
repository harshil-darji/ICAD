import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/constants/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getStatewiseData(): Observable<any>
  {
    return this.http.get(GlobalConstants.nationalURL).pipe(catchError(this.errorHandler));
  }

  getMetricsData(): Observable<any>
  {
    return this.http.get(GlobalConstants.cumulativeLatestURL).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse)
  {
    return observableThrowError(error || "Server Error");
  }
}
