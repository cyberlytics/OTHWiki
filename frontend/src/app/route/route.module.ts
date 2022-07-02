import { Routes } from "@angular/router";
import { ArtikelComponent } from '../artikel/artikel.component';
import { EditorComponent } from "../editor/editor.component";


export const ARTIKEL_ROUTES: Routes = [
  {path: '', component: ArtikelComponent},
  {path: ':id', component: ArtikelComponent}
];

