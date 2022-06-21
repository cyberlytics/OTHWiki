import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Article, updateArticle, OldVersions } from '../dataclasses';

@Component({
  selector: 'app-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArtikelComponent implements OnInit {

  constructor(private http: HttpClient) { }

    //TODO: Needs to be changed for real ArticleID
    FIXED_ARTICLE_ID = "62b0c1170dca46091d7de084"
    FIXED_TAGS = ["Testing"]

    path= 'http://127.0.0.1:8000/';

    articleText=''

  ngOnInit(): void {
    this.setArticleText(this.FIXED_ARTICLE_ID);
  }

  setArticleText(id : string){
    return this.http.get<Article>(this.path+"articles/"+id).pipe(catchError(this.handleError)).subscribe((res) => {
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