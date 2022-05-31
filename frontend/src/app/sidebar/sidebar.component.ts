import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  navItems: any;
  path= 'http://127.0.0.1:8000/categories/';

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    this.loadNavItems();
  }

  loadNavItems(){
    this.http.get(this.path).subscribe(res => {
      console.log('res', res)
    });
    console.log(this.navItems);
  }
}
export interface NavItems {
  heroesUrl: string;
  textfile: string;
  date: any;
}