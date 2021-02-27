const util = (function(){
  function storeIngredients(recipes) {
    let ingredientsToDisplay = {};
    recipes.forEach(function(recipe) {
      recipe.ingredients.forEach(function(ingredient) {
        if (ingredientsToDisplay[ingredient.type]) {
          ingredientsToDisplay[ingredient.type].add(ingredient.name);
        } else {
          ingredientsToDisplay[ingredient.type] = new Set();
          ingredientsToDisplay[ingredient.type].add(ingredient.name);
        }
      })
    })
    return ingredientsToDisplay;
  }
    
  return {
    storeIngredients
  };
}());

if (typeof module == 'undefined') { var module = {}; }
module.exports = util;