import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeservice: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          // console.log(this.editMode);
          this.initform();
        }
      );
  }
  onSubmit() {
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['Imagepath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeservice.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeservice.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  private initform() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescripition = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeservice.getrecipe(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescripition = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                , Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }


    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescripition, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
