import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();


    private recipes: Recipe[] = [
        new Recipe('Worlds Best  "Lasagna "',
            'the best Lasagna',
            'https://www.tasteofhome.com/wp-content/uploads/2018/01/Garlic-Beef-Enchiladas_EXPS_GBBKZ17_10248_B12_14_1b-696x696.jpg ',
            [
                new Ingredient(' Meat', 1),
                new Ingredient('Donuts', 2)
            ]),
        new Recipe('Chicken Marsala Over White Rice',
            'chicken with over white Rice',
            'https://www.tasteofhome.com/wp-content/uploads/2018/01/Moist-Italian-Turkey-Breast_EXPS_SDON17_108967_C06_30_2b-1-696x696.jpg ',
            [
                new Ingredient('masala chicken', 1),
                new Ingredient('ramba chicken', 12)
            ]),
        new Recipe('Neapolitan Pizza',
            'duffy pizza for u ',
            'https://www.tasteofhome.com/wp-content/uploads/2017/10/Chicken-Pizza_exps30800_FM143298B03_11_8bC_RMS-2-696x696.jpg ',
            [
                new Ingredient('veg pizza', 10),
                new Ingredient('New York Style Pizza', 12)
            ])
    ];

    constructor(private sLService: ShoppingListService) {

    }
    //   RecipeSelected: any;

    getRecipes() {
        return this.recipes.slice();
    }

    getrecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredient: Ingredient[]) {
        this.sLService.addIngredients(ingredient);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index :number){
        this.recipes.splice(index,1)
        this.recipesChanged.next(this.recipes.slice());
    }
}