import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule, rountingComponents } from './app-routing.module';
import { AppComponent } from './main/app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { EditorComponent } from './editor/editor.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import {MatChipsModule} from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {SidebarArtikelComponent} from './sidebar-artikel/sidebar-artikel.component';
import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    EditorComponent,
    ArtikelComponent,
    HeaderComponent,
    rountingComponents,
    ScrollToTopComponent,
    SidebarArtikelComponent,
    CategoriesDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdbCollapseModule,  
    MatChipsModule,
    RouterModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }