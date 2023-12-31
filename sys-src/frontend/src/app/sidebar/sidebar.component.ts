import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { catchError, throwError } from 'rxjs';
import {NavItems} from '../dataclasses';
import { ActivatedRoute } from '@angular/router';

import { AppSettings } from 'src/app/app.config';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesDialogComponent } from '../categories-dialog/categories-dialog.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  categories: any;
  test: any;
  path = AppSettings.API_ENDPOINT + 'categories';

  constructor(private http: HttpClient,public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.loadNavItems();
  }

  loadNavItems(){
    this.http.get<NavItems[]>(this.path).pipe(catchError(this.handleError)).subscribe((data) =>  {
      this.categories = data;
    /*  console.log("##########################################");
      console.log(data)
      console.log(this.categories)
      console.log("##########################################");
      */
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

  openDialog() {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.operation == 'create'){
        if(result.parent === undefined){
          result.parent = null;
        }
        var newCategoy = {
          kategorie: result.value,
          parent_kategorie: result.parent
        }
        this.http.post(this.path,newCategoy).pipe(catchError(this.handleError)).subscribe((data) =>  {console.log(data)})
      }

      if(result.operation == 'delete'){
        this.http.delete(this.path+"/"+result.value).pipe(catchError(this.handleError)).subscribe((data) =>  {console.log(data)})
      }
    });
  }
}
