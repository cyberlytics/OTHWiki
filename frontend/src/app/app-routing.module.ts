import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { SidebarArtikelComponent } from './sidebar-artikel/sidebar-artikel.component';
import { ARTIKEL_ROUTES } from './route/route.module';
import { EDITOR_ROUTES } from './route/route-editor.module';
import { HOME_ROUTES } from './route/route-home.module';


const routes: Routes = [ 
  { path: '', component: SidebarArtikelComponent, children: HOME_ROUTES},
  { path: 'artikel', component: SidebarArtikelComponent, children: ARTIKEL_ROUTES},
  { path: 'new_artikel', component: SidebarArtikelComponent, children: EDITOR_ROUTES},
  { path: 'edit', component: SidebarArtikelComponent, children: EDITOR_ROUTES},
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const rountingComponents = [ EditorComponent, ArtikelComponent]