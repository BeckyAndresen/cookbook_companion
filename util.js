const util = (function () {
  /**
   * Groups ingredients by type
   * @param {Array} recipes
   * @returns {Object} Ingredients grouped by their type. Object properties are the ingredient type and the associated values are the ingredients.
   * { ingredientType: Set(['ingredient1', 'ingredient2']) }
   */
  function getIngredientsGroupedByType(recipes) {
    let ingredientsGroupedByType = {};
    recipes.forEach(function (recipe) {
      recipe.ingredients.forEach(function (ingredient) {
        if (ingredientsGroupedByType[ingredient.type]) {
          ingredientsGroupedByType[ingredient.type].add(ingredient.name);
        } else {
          ingredientsGroupedByType[ingredient.type] = new Set([ingredient.name]);
        }
      })
    })
    return ingredientsGroupedByType;
  }

  /**
   * @param {Array} recipes
   * @returns {Array} Array of objects for each recipe.
   * [ {name: "recipe1", cookbook: 'book - page #', ingredients: Set(['ingredient1', 'ingredient2']} ]
   */
  function buildIndex(recipes) {
    let recipeIndex = [];
    recipes.forEach(function (recipe) {
      let ingredients = new Set();
      recipe.ingredients.forEach(function (ingredient) {
        ingredients.add(ingredient.name)
      })
      recipeIndex.push({ name: recipe.name, cookbook: recipe.cookbook, ingredients: ingredients })
    })
    return recipeIndex;
  }

  /**
   * @param {Array} recipesIndex
   * @param {Array} checkedIngredients
   * @returns {Array} List of recipes that the user can make with their available ingredients.
   */
  function findRecipes(recipesIndex, checkedIngredients) {
    const checkedIngredientsSet = new Set(checkedIngredients);
    let recipesToMake = [];
    recipesIndex.forEach(function (recipe) {
      if (isSuperset(checkedIngredientsSet, recipe.ingredients)) {
        recipesToMake.push(recipe.name);
      }
    })
    return recipesToMake;
  }

  /**
   * Copied from MDN basic set operations
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#implementing_basic_set_operations
   * @param {Set} set
   * @param {Set} subset
   * @returns {boolean}
   */
  function isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  return {
    getIngredientsGroupedByType, buildIndex, findRecipes
  };
}());

// if running in a web brower, initialize module variable
if (typeof module == "undefined") { var module = {}; }
// exports module for Jest tests
module.exports = util;