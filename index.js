(function(){
  "use strict";

  $.getJSON("simple_recipes.json", function(data) {
    processIngredients(data.recipes);
  });

  function processIngredients(recipes) {
    let ingredientsToDisplay = storeIngredients(recipes);

    displayIngredientsByType(ingredientsToDisplay);

    attachEventHandlers();
  }

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

  function displayIngredientsByType(ingredientsToDisplay) {
    Object.keys(ingredientsToDisplay).forEach(function(type) {
      $( "<h2/>", {
        "class": "ingredient-type",
        "id": type,
        html: type
      }).appendTo( "body" );
      ingredientsToDisplay[type].forEach(formatIngredients);
    });
  }

  function formatIngredients(ingredient) {
    $( "<div/>", {
      "class": "ingredient-checkbox",
      html: "<label> <input type='checkbox' id='" + ingredient + "'>" + ingredient + "</label>"
    }).appendTo( "body" );
  }

  function attachEventHandlers() {
    $('input:checkbox').change(function() {
      const checkedIngredients = $('input:checked').map(function(_, element) {
        return element.id;
      }).get();
    });
  }
})();