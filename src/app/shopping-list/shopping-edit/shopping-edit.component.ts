import { Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') ShForm: NgForm;
  subscripition: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private sLService: ShoppingListService) { }

  ngOnInit() {
    this.subscripition = this.sLService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.sLService.getIngredient(index);
          this.ShForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }


  ngOnDestroy() {
    this.subscripition.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.sLService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
     this.sLService.addIngredient(newIngredient);
    }
    this.editMode =false;
    form.reset();
  };

  onClear(){
    this.ShForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.sLService.deleteingredient(this.editedItemIndex);
    this.onClear();
  }



}
