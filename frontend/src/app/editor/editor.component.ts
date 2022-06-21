import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, QUILL_CONFIG_TOKEN } from 'ngx-quill';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'; 
import { catchError, Observable, throwError } from 'rxjs';
import Quill from 'quill';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {

  editor: Quill;

  path= 'http://127.0.0.1:8000/';

  //Temporär: 
  private _currentArticle: Article;
  public get currentArticle(): Article {
    return this._currentArticle;
  }
  public set currentArticle(value: Article) {
    this._currentArticle = value;
    console.log("CALLED IT");
    if(!(typeof value === undefined)){
      this.editorText = value?.artikel_text as string
    }
  }

  //TODO: Needs to be changed for real ArticleID
  FIXED_ARTICLE_ID = "62b0c1170dca46091d7de084"
  FIXED_TAGS = ["Testing"]

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    //this.getArticleByID(this.FIXED_ARTICLE_ID);
    //console.log(this.currentArticle);
    //this.editorText = this.currentArticle.artikel_text;
  }

  title = 'frontend';
  editorText = '';

  /**
   * Updates a Article in the Database
   * @param update Article Object
   * @returns Observable of Request
   */
  postUpdateArticle(update : updateArticle){
    return this.http.post<updateArticle>(this.path+"articles/update",update).pipe(catchError(this.handleError))
    .subscribe((res) => {
      console.log(res);
    })
  }

  /**
   * Gets an article by its ID
   * @param id ObjectID of the Article
   * @returns 
   */
  getArticleByID(id : string){
    return this.http.get<Article>(this.path+"articles/"+id).pipe(catchError(this.handleError)).subscribe((res) => {
      //console.log(res);
      this.currentArticle = res;
      console.log(this.currentArticle);
      this.editor.setText(res.artikel_text);
    })
  }

  /**
   * Gets the Quill Editor instance, once it is created
   * @param quill Quill Editor Instance
   */
  createQuill(quill: Quill){
    console.log("CREATED");
    this.editor = quill;
    this.getArticleByID(this.FIXED_ARTICLE_ID);
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

  /**
   * Gets Called wehen the Contents of the Editor Change
   * @param event Event that occured
   */
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorText = event['editor']['root']['innerHTML'];
    console.log(event);
  }

  

  //logging on button click to not cluster the console
  onSubmit() {
    console.log(this.editorText);

    //Build the Article Object
    var update : updateArticle= {
      artikel_name: "Test",
      artikel_text: this.editorText,
      tags: this.FIXED_TAGS,
      artikel_id: this.FIXED_ARTICLE_ID
    }

    //Send the HTTP Request
    var x = this.postUpdateArticle(update)
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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      [{ align: [] }],

      // ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video']                         // link and image, video
    ],
  };

  oldText = ` 
  <h1>Simple Wikipedia Website Placeholder</h1>      
  <p class="roleNote">
  This article is about the writing implement. For other uses, see Pencil
  (disambiguation).
</p>

<!-- <div class="articleRight">
<div class="articleRightInner">
  <img src="../../assets/pencil.jpg" alt="pencil" />
</div>
This is a blue <a href="">pencil</a>
</div> -->
<p>
  Lorem ipsum <strong>dolor sit amet</strong>, nonumes voluptatum mel ea, cu
  case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in
  ius, sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu
  mucius fabellas. Stet facilis ius te, quando voluptatibus eos in. Ad vix
  mundi alterum, integre urbanitas intellegam vix in.
</p>
<p>
  Eum facete intellegat ei, ut mazim melius usu. Has elit simul primis ne,
  regione minimum id cum. Sea deleniti dissentiet ea. Illud mollis
  moderatius ut per, at qui ubique populo. Eum ad cibo legimus, vim ei
  quidam fastidii.
</p>
<p>
  Quo debet vivendo ex. Qui ut admodum senserit partiendo. Id adipiscing
  disputando eam, sea id magna pertinax concludaturque. Ex ignota epicurei
  quo, his ex doctus delenit fabellas, erat timeam cotidieque sit in. Vel eu
  soleat voluptatibus, cum cu exerci mediocritatem. Malis legere at per, has
  brute putant animal et, in consul utamur usu.
</p>
<p>
  Te has amet modo perfecto, te eum mucius conclusionemque, mel te erat
  deterruisset. Duo ceteros phaedrum id, ornatus postulant in sea. His at
  autem inani volutpat. Tollit possit in pri, platonem persecuti ad vix, vel
  nisl albucius gloriatur no.
</p>
<h2>Paulo eirmod intellegam</h2>
<h3>Percipit maiestatis sea eu</h3>
<p>
  Ex quod meis per, ea paulo eirmod intellegam usu, eam te propriae
  fabellas. Nobis graecis has at, an eum audire impetus. Ius epicuri
  verterem ex, qui cu solet feugiat consetetur. Placerat apeirian et sea,
  nec wisi viderer definiebas ex, at eum oratio honestatis.
</p>
<p>
  Eum illum nulla graeci at, mea quis munere indoctum at. In sea partiendo
  hendrerit. Quaestio partiendo an eam, rebum vitae accumsan ius id. Duo at
  causae option.
</p>
<p>
  At persius imperdiet vis, ea elit atqui aperiri mei, percipit maiestatis
  sea eu. Has et partem hendrerit, vim cibo veniam aliquid an. No pri populo
  abhorreant, everti mandamus ne mea. Debitis forensibus suscipiantur ius
  cu. Ei per possim verterem, et iudico voluptatum eos.
</p>
<h3>Nam option recusabo</h3>
<p>
  Te mel meis adhuc. Choro percipit mei eu, fabulas fuisset tibique ad sea,
  cu eos sint falli iracundia. Usu ex minimum corrumpit, postea dolores
  salutandi ne est, cu nam option recusabo reprehendunt. Prima vocibus
  argumentum ex usu. Nam te legere salutatus dissentiunt, his ei principes
  prodesset, est possit blandit ex.
</p>
<p>
  Pro no rebum timeam necessitatibus, et mnesarchum quaerendum has. Duo
  molestie interesset at. Vel ad legere populo. Sed ne saepe doming
  perpetua. Omnis iuvaret volumus an duo, qui duis audiam fabellas in.
</p>
<p>
  Te has amet modo perfecto, te eum mucius conclusionemque, mel te erat
  deterruisset. Duo ceteros phaedrum id, ornatus postulant in sea. His at
  autem inani volutpat. Tollit possit in pri, platonem persecuti ad vix, vel
  nisl albucius gloriatur no.
</p>
<h2>Sed rebum regione suscipit</h2>
<p>
  Ea duo atqui incorrupte, sed rebum regione suscipit ex, mea ex dicant
  percipit referrentur. Dicat luptatum constituam vix ut. His vide platonem
  omittantur id, vel quis vocent an. Ad pro inani zril omnesque. Mollis
  forensibus sea an, vim habeo adipisci contentiones ad, tale autem graecis
  ne sit.
</p>`;
}

//Datamodels:
export interface updateArticle{
  artikel_id: string;
  artikel_name: string;
  artikel_text: string;
  tags: Array<string>;
}

export interface Article{
  _id: string;
  artikel_name: string;
  artikel_text: string;
  kategorie: string;
  current_version: number;
  created: Date;
  tags: Array<string>;
  old_versions: Array<OldVersions>;
}

export interface OldVersions{
  article_name: string;
  article_text: string;
  article_version: number;
}

