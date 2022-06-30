import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { Article} from '../dataclasses';

import { AppSettings } from 'src/app/app.config';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ArtikelComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute) { }

  private subscription: Subscription;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("unsubscribe");
    
  }

    //TODO: Needs to be changed for real ArticleID
    FIXED_ARTICLE_ID = "62b0c1170dca46091d7de084"
    FIXED_TAGS = ["Testing"]
    id: any;

    path = AppSettings.API_ENDPOINT;

    articleText='';
    articleName='';

  ngOnInit(): void {
    this.subscription = this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      console.log("subscribe");
      console.log(this.id);
      if(this.id === undefined || this.id === null)
        this.setArticleText(this.FIXED_ARTICLE_ID);
      else
        this.setArticleText(this.id);
  });
  }

  setArticleText(id : string){
    return this.http.get<Article>(this.path+"articles/"+id).pipe(catchError(this.handleError)).subscribe((res) => {
      this.articleName = res.artikel_name;
      this.articleText = res.artikel_text;
    })
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