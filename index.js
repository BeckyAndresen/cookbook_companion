(function(){
  "use strict";

  $.getJSON("simple_recipes.json", function(data) {
    processRecipes(data.recipes);
  });

  /**
   * Processes data from JSON file
   * @param {Array} recipes
   */
  function processRecipes(recipes) {
    let ingredientsToDisplay = util.getIngredientsGroupedByType(recipes);

    displayIngredientsByType(ingredientsToDisplay);

    attachEventHandlers();
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
    $("input:checkbox").change(function() {
      const checkedIngredients = $("input:checked").map(function(_, element) {
        return element.id;
      }).get();
    });
  }
})();