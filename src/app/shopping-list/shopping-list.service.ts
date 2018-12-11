import { Ingredient } from '../shared/ingredients.model';

import { Subject } from 'rxjs';

export class ShoppingListService {
  IngredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  Ingredient(): Ingredient[] {
    throw new Error("Method not implemented.");
  }

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('orange', 15)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }


  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.IngredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredient: Ingredient[]) {
    // for (let ingredient of this.ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredient);
    this.IngredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.IngredientsChanged.next(this.ingredients.slice());
  }
  deleteingredient(index : number){
   this.ingredients.splice(index ,1);
   this.IngredientsChanged.next(this.ingredients.slice() );
  }
}