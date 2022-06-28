import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, QUILL_CONFIG_TOKEN } from 'ngx-quill';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Quill from 'quill';
import { Article, updateArticle, OldVersions, NavItems } from '../dataclasses';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
export interface TagItem {
  name: string;
}
interface Cat {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditorComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  //#region Tags Leiste
  // ----- Tags Leiste ----- ///
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  static readonly MAX_TAG_SIZE: number = 50
  hideCategories: boolean = true;

  /**
   * Wird aufgerufen, wenn ein Tag hinzugefügt wird.
   * @param event Auslösendes Event
   */
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add Item
    // Must not be already in tags and must be shorter than 50 characters
    if (value && !this.tags.includes(value) && value.length < EditorComponent.MAX_TAG_SIZE) {
        this.tags.push(value); 
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  /**
   * Fügt Item zu den Tags hinzu
   * @param item Item das entfernt werden soll
   */
  removeTag(item: string): void {
    const index = this.tags.indexOf(item);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  //#endregion

  //#region Kategorie Dropdown

  selectedValue: string;

  cats: Cat[];
  rawCats: NavItems[];

  //#endregion

  //#region Editor
  // ----- Editor ----- //

  editor: Quill;
  path = 'http://127.0.0.1:8000/';
  title = 'frontend';
  editorText = '';
  oldText = ``;
  articleName = ''
  titleID = '';

  //Temporär, hält aktuellen Artikel: 
  private _currentArticle: Article;
  public get currentArticle(): Article {
    return this._currentArticle;
  }
  public set currentArticle(value: Article) {
    this._currentArticle = value;
    if (!(typeof value === undefined)) {
      this.editorText = value?.artikel_text as string
    }
  }

  /**
 * Gets the Quill Editor instance, once it is created
 * @param quill Quill Editor Instance
 */
  createQuill(quill: Quill) {
    this.editor = quill;
    this.getArticleByID(this.FIXED_ARTICLE_ID);
    //Falls neuer Artikel erstellt werden soll.
    if(this.FIXED_ARTICLE_ID == ""){
      this.hideCategories=false;
      this.getAllCategories();
    }
  }

  /**
   * Gets Called wehen the Contents of the Editor Change
   * @param event Event that occured
   */
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorText = event['editor']['root']['innerHTML'];
  }

//prevents making new lines in the title
  titleChanged(event : any ){
    if(event.keyCode == 13){
      event.preventDefault();
      return false
    }
    return
  }

  //#endregion

  //#region HTTP Requests

  // ----- HTTP Requests ----- //


  //TODO: Needs to be changed for real ArticleID
  //FIXED_ARTICLE_ID = "62b0c1170dca46091d7de084"
  FIXED_ARTICLE_ID = ""
  FIXED_TAGS = ["Testing"]

  /**
   * Updates a Article in the Database
   * @param update Article Object
   * @returns Observable of Request
   */
  postUpdateArticle(update: updateArticle) {
    return this.http.post<updateArticle>(this.path + "articles/update", update).pipe(catchError(this.handleError))
      .subscribe((res) => {
      })
  }

  /**
   * Gets an article by its ID
   * @param id ObjectID of the Article
   * @returns 
   */
  getArticleByID(id: string) {
    return this.http.get<Article>(this.path + "articles/" + id).pipe(catchError(this.handleError)).subscribe((res) => {
      this.currentArticle = res;
      this.oldText = res.artikel_text;
      this.tags = res.tags;
      this.articleName = res.artikel_name;
    })
  }

  getAllCategories(){
    this.http.get<NavItems[]>(this.path + "categories").pipe(catchError(this.handleError)).subscribe((data) =>  {
      this.rawCats = data;
      console.log("XXXX", this.rawCats);
      var array: Cat[]= [];

      //Als current Oberobjekt wird ein Leeres Objekt generiert, das als Subkategorien Alle Oberkategorien enthält.
      this.addSubcategoriesRecursive(array, {_id: "", kategorie: "null", subkategorien: this.rawCats, artikel: []})
      this.cats = array;
    })
  }

  postNewArticle(art: Article) {
    return this.http.post<Article>(this.path + "articles", art).pipe(catchError(this.handleError))
      .subscribe((res) => {
      })
    }

  addSubcategoriesRecursive(array: Cat[], current: NavItems){
    current.subkategorien.forEach(element => {
      array.push({value: element._id, viewValue: element.kategorie});
      if(element.subkategorien != null){
        this.addSubcategoriesRecursive(array, element);
      }
    });
  }

  /**
   * Handels HTTP Request errors
   * @param error Error Thrown by the request
   * @returns 
   */
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

  //#endregion

  //logging on button click to not cluster the console
  onSubmit() {
    
    //making sure titles can't be changed to null or empty strings
    var tempTitle = document.getElementById('title')!.innerText;
    if(tempTitle.length > 0 && !null){
      this.articleName = tempTitle;
    }

    //Update Article
    if(this.hideCategories){
      var update: updateArticle = {
        artikel_name: this.articleName,
        artikel_text: this.editorText,
        tags: this.tags,
        artikel_id: this.FIXED_ARTICLE_ID
      }
      //Send the HTTP Request
      var x = this.postUpdateArticle(update)
    }else{
      //Generate new Article

      console.log(this.selectedValue);
      var art: Article = {
        artikel_name: this.articleName,
        artikel_text: this.editorText,
        kategorie: this.selectedValue,
        current_version: 1,
        tags: this.tags
      }
      this.postNewArticle(art)
    }


  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      // ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      // [{ align: [] }],

      // ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video']                         // link and image, video
    ],
  };
}



