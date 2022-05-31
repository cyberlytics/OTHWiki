import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArtikelComponent } from './artikel/artikel.component';

const routes: Routes = [ 
  { path: '', component: ArtikelComponent},
  { path: 'artikel', component: ArtikelComponent},
  { path: 'edit', component: EditorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const rountingComponents = [ EditorComponent, ArtikelComponent]