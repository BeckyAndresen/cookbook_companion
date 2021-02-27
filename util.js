const util = (function(){
  function getIngredientsGroupedByType(recipes) {
    let ingredientsGroupedByType = {};
    recipes.forEach(function(recipe) {
      recipe.ingredients.forEach(function(ingredient) {
        if (ingredientsGroupedByType[ingredient.type]) {
          ingredientsGroupedByType[ingredient.type].add(ingredient.name);
        } else {
          ingredientsGroupedByType[ingredient.type] = new Set();
          ingredientsGroupedByType[ingredient.type].add(ingredient.name);
        }
      })
    })
    return ingredientsGroupedByType;
  }
    
  return {
    getIngredientsGroupedByType
  };
}());

if (typeof module == 'undefined') { var module = {}; }
module.exports = util;