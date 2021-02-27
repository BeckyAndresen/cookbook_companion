const util = (function(){
  /**
   * Groups ingredients by type
   * @param {Array} recipes
   * @returns {Object} Ingredients grouped by their type. Object properties are the ingredient type and the associated values are the ingredients.
   * Key: "ingredient type"
   * Value: Set(['ingredient1', 'ingredient2'])
   */
  function getIngredientsGroupedByType(recipes) {
    let ingredientsGroupedByType = {};
    recipes.forEach(function(recipe) {
      recipe.ingredients.forEach(function(ingredient) {
        if (ingredientsGroupedByType[ingredient.type]) {
          ingredientsGroupedByType[ingredient.type].add(ingredient.name);
        } else {
          ingredientsGroupedByType[ingredient.type] = new Set([ingredient.name]);
        }
      })
    })
    return ingredientsGroupedByType;
  }
    
  return {
    getIngredientsGroupedByType
  };
}());

// if running in a web brower, initialize module variable
if (typeof module == 'undefined') { var module = {}; }
// exports module for Jest tests
module.exports = util;