import { Routes } from "@angular/router";
import { ArtikelComponent } from '../artikel/artikel.component';
import { EditorComponent } from "../editor/editor.component";


export const EDITOR_ROUTES: Routes = [
  {path: '', component: EditorComponent},
  {path: ':id', component: EditorComponent}
];

