(function() {
  'use strict';

  $.getJSON('simple_recipes.json', function(data) {
    processRecipes(data.recipes);
  });

  /**
   * Processes data from a JSON file and displays recipe ingredients grouped by their type.
   * @param {Array} recipes
   */
  function processRecipes(recipes) {
    const ingredientsToDisplay = util.getIngredientsGroupedByType(recipes);
    const recipesIndex = util.buildIndex(recipes);

    displayIngredientsByType(ingredientsToDisplay);

    attachEventHandlers(recipesIndex);
  }

  function displayIngredientsByType(ingredientsToDisplay) {
    const parent = $('#ingredients-grouped-by-type');

    Object.keys(ingredientsToDisplay).forEach(function(type) {
      parent.append(`<h2 class='ingredient-type' id=${type}> ${type} </h2>`);

      ingredientsToDisplay[type].forEach(function(ingredient) {
        const ingredientCheckbox =`
          <div>
            <label> <input type='checkbox' id='${ingredient}'>${ingredient}</label>
          </div>
        `;
        parent.append(ingredientCheckbox);
      });
    });
  }

  function attachEventHandlers(recipesIndex) {
    $('input:checkbox').change(function() {
      const checkedIngredients = $('input:checked').map(function(_, element) {
        return element.id;
      }).get();

      const recipesToDisplay = util.findRecipes(recipesIndex, checkedIngredients);

      displayRecipes(recipesToDisplay);
    });
  }

  function displayRecipes(recipesToDisplay) {
    const recipesListElement = $('#recipes ul');
    recipesListElement.children().remove();
    recipesToDisplay.forEach( function(recipe) {
      recipesListElement.append(`<li> ${recipe} </li>`);
    });
  }
})();
