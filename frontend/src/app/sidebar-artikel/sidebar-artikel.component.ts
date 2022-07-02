import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar-artikel',
  templateUrl: './sidebar-artikel.component.html',
  styleUrls: ['./sidebar-artikel.component.css']
})
export class SidebarArtikelComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav
  title = 'frontend';

  constructor(private observer: BreakpointObserver){
  }

  

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) =>  {
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

}
