const util = (function() {
  'use strict';
  /**
   * Groups ingredients by type for display.
   * @param {Array} recipes
   * @return {Map} Ingredients grouped by their type.
   * Keys are the ingredient type and values are the ingredients.
   * Map { 'ingredientType' => Set {'ingredient1', 'ingredient2' } }
   */
  function getIngredientsGroupedByType(recipes) {
    const ingredientsGroupedByType = new Map();
    recipes.forEach(function(recipe) {
      recipe.ingredients.forEach(function(ingredient) {
        if (ingredientsGroupedByType.has(ingredient.type)) {
          ingredientsGroupedByType.get(ingredient.type).add(ingredient.name);
        } else {
          ingredientsGroupedByType.set(ingredient.type, new Set([ingredient.name]));
        }
      });
    });
    return ingredientsGroupedByType;
  }

  /**
   * Builds an index of recipes to compare with user selected ingredients.
   * @param {Array} recipes
   * @return {Array} Array of objects for each recipe.
   * [ {
   *    name: "recipe1",
   *    cookbook: 'book - page #',
   *    ingredients: Set { 'ingredient1', 'ingredient2' }
   * } ]
   */
  function buildIndex(recipes) {
    const recipeIndex = recipes.map(function(recipe) {
      const ingredients = recipe.ingredients.map(function(ingredient) {
        return ingredient.name;
      });
      return {name: recipe.name, cookbook: recipe.cookbook, ingredients: new Set(ingredients)};
    });
    return recipeIndex;
  }

  /**
   * Searches the recipe index for recipes that the user has all of the ingredients for.
   * @param {Array} recipesIndex
   * @param {Array} checkedIngredients
   * @return {Array} List of recipes that the user can make with their available ingredients.
   */
  function findRecipes(recipesIndex, checkedIngredients) {
    const checkedIngredientsSet = new Set(checkedIngredients);

    const recipesToMake = recipesIndex.filter(function(recipe) {
      return isSuperset(checkedIngredientsSet, recipe.ingredients);
    }).map(function(recipe) {
      return recipe.name;
    });

    return recipesToMake;
  }

  // eslint-disable-next-line max-len
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations
  /**
   * Copied from MDN basic set operations
   * @param {Set} set
   * @param {Set} subset
   * @return {boolean}
   */
  function isSuperset(set, subset) {
    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  return {
    getIngredientsGroupedByType, buildIndex, findRecipes,
  };
}());

// if running in a web brower, initialize module variable
if (typeof module == 'undefined') {
  // eslint-disable-next-line no-var
  var module = {};
}
// exports module for Jest tests
module.exports = util;
