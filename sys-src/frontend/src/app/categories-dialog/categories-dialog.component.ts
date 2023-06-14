import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavItems } from '../dataclasses';
import { Cat } from '../editor/editor.component';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css']
})
export class CategoriesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: NavItems[], 
  private dialogRef: MatDialogRef<CategoriesDialogComponent>,
  private router:Router) { }

  categoriesList: Cat[];
  parentCategoriesList: Cat[];
  selectedValue: string;
  selectedValueParent: string;

  hideDropdown: boolean = true;
  hideFormField: boolean = false;
  newCategoryName: string;


  ngOnInit(): void {
    //Als current Oberobjekt wird ein Leeres Objekt generiert, das als Subkategorien Alle Oberkategorien enthält.
    var array: Cat[]= [];
    this.addSubcategoriesRecursive(array, { _id: "", kategorie: "null", subkategorien: this.data, artikel: [] })
    this.categoriesList = array;
  }

  addSubcategoriesRecursive(array: Cat[], current: NavItems) {
    current.subkategorien.forEach(element => {
      console.log({ value: element._id, viewValue: element.kategorie })
      array.push({ value: element._id, viewValue: element.kategorie });
      if (element.subkategorien != null) {
        this.addSubcategoriesRecursive(array, element);
      }
    });
  }

  CreateButtonClick(){
    this.hideDropdown=true;
    this.hideFormField=false;
  }

  DeleteButtonClick(){
    this.hideDropdown=false;
    this.hideFormField=true;

  }

  Submit(){
    if(!this.hideDropdown){
      this.dialogRef.close({operation: 'delete', value: this.selectedValue});
    }else if(this.newCategoryName != null && !(this.newCategoryName === undefined)){
      this.dialogRef.close({operation: 'create', value: this.newCategoryName, parent: this.selectedValueParent})
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  KategorieUpdated(event: any){
    this.newCategoryName = event.target.value
    console.log(event.target.value)
  }

  change(action: any){
    if(action.index == 0){
      this.hideDropdown=true;
      this.hideFormField=false;
    }else if(action.index == 1){
      this.hideDropdown=false;
      this.hideFormField=true;
    }
  }
}
