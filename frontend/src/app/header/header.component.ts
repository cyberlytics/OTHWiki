import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuActive: boolean = false;
  public getScreenWidth: any;

  @ViewChild('myDiv', { read: ElementRef, static: false }) myDiv!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
  }

  /**
   * Wenn in der Mobilen Ansicht das Menü ausgelöst wird und der Benutzer seine Fenstergröße
   * vergrößert, wird das Menü in der Mobilen Ansicht geschlossen.
   */
  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.getScreenWidth = window.innerWidth;

    if (this.menuActive == true) {
      if (this.getScreenWidth > 993) {
        //Get HTML Button Element
        let el: HTMLElement = this.myDiv.nativeElement;
        el.click();
      }
    }
  }

  /**
   * Merkt sich ob in der Mobilen Ansicht das Menü ausgelöst wurde.
   */
  menuClick() {
    if (this.menuActive == false) {
      this.menuActive = true;
    }
    else {
      this.menuActive = false;
    }
  }

  /**
   * 
   * @param value Eingabewert
   * @returns 
   */
  submitSearch(value: string) {
    console.log(value);
  }

}
