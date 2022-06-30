import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArtikelComponent } from './artikel/artikel.component';

const routes: Routes = [ 
  { path: '', component: ArtikelComponent},
  { path: 'artikel/:id', component: ArtikelComponent},
  { path: 'artikel', component: ArtikelComponent},
  { path: 'new_artikel', component: EditorComponent},
  { path: 'edit', component: EditorComponent},
  { path: 'edit/:id', component: EditorComponent}
  //{ path: 'artikel', component: ArtikelComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const rountingComponents = [ EditorComponent, ArtikelComponent]