import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuActive: boolean = false;
  public getScreenWidth: any;
  public getScreenHeight: any;

  @ViewChild('myDiv', { read: ElementRef, static: false }) myDiv!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if (this.menuActive == true) {
      if (this.getScreenWidth > 993) {
        //Get HTML Button Element
        let el: HTMLElement = this.myDiv.nativeElement;
        el.click();
      }
    }
  }

  menuClick() {
    if (this.menuActive == false) {
      this.menuActive = true;
    }
    else {
      this.menuActive = false;
    }
  }

  submitSearch(value: string) {
    console.log(value);
  }

}
