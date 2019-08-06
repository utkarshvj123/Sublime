import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) {
  }

  url = 'https://restcountries.eu/rest/v2/';

// ------Getting complete array of countries---------//
  getCountriesArray() {
    return this.http.get(this.url + 'all').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


// ----Getting a single country detail accourding to the name-------
  getSingleCountryDetails(countryname) {
    console.log(this.url);
    return this.http.get(this.url + 'name/' + countryname.name).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

// ------------Handling Errors creating a common function which will
  // ---Provide all kinds of error i.e from front or backend
  handleError(error) {
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = {Error: error.error.message};
    } else {
      // server-side error
      errorMessage = {Message: error.message};
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
