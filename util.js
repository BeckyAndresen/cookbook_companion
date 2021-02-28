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
      ingredients = new Set();
      recipe.ingredients.forEach(function (ingredient) {
        ingredients.add(ingredient.name)
      })
      recipeIndex.push({ name: recipe.name, cookbook: recipe.cookbook, ingredients: ingredients })
    })
    return recipeIndex;
  }

  return {
    getIngredientsGroupedByType, buildIndex
  };
}());

// if running in a web brower, initialize module variable
if (typeof module == "undefined") { var module = {}; }
// exports module for Jest tests
module.exports = util;