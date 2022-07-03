import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { SidebarArtikelComponent } from './sidebar-artikel/sidebar-artikel.component';
import { AppComponent } from './main/app.component';
import { ARTIKEL_ROUTES } from './route/route.module';
import { EDITOR_ROUTES } from './route/route-editor.module';
import { HOME } from './route/route-editor.module copy';


const routes: Routes = [ 
  { path: '', component: SidebarArtikelComponent, children: HOME},
  { path: 'artikel', component: SidebarArtikelComponent, children: ARTIKEL_ROUTES},
  { path: 'artikel', component: ArtikelComponent},
  { path: 'new_artikel', component: SidebarArtikelComponent, children: EDITOR_ROUTES},
  { path: 'edit', component: SidebarArtikelComponent, children: EDITOR_ROUTES},
  { path: 'edit/:id', component: SidebarArtikelComponent, children: EDITOR_ROUTES}
  //{ path: 'artikel', component: ArtikelComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const rountingComponents = [ EditorComponent, ArtikelComponent]