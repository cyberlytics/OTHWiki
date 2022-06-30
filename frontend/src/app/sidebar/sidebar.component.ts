import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { catchError, throwError } from 'rxjs';
import {NavItems} from '../dataclasses';
import { ActivatedRoute } from '@angular/router';

import { AppSettings } from 'src/app/app.config';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  categories: any;
  test: any;
  path = AppSettings.API_ENDPOINT + 'categories';

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    this.loadNavItems();
  }

  loadNavItems(){
    this.http.get<NavItems[]>(this.path).pipe(catchError(this.handleError)).subscribe((data) =>  {
      this.categories = data;
      console.log("##########################################");
      console.log(data)
      console.log(this.categories)
      console.log("##########################################");
    });
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
