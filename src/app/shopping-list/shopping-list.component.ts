import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private Subscripition: Subscription;

  constructor(private sLService: ShoppingListService) { }

  ngOnInit() {

    this.ingredients = this.sLService.getIngredients();
    this.Subscripition = this.sLService.IngredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

  }

  onEditItem(index: number) {
      this.sLService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.Subscripition.unsubscribe();
  }
}
