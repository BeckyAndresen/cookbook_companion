const util = require('./util');
describe('getIngredientsGroupedByType', () => {
  test('remove duplicate ingredients', () => {
    const recipes = [
      {
        'name': 'peanut butter sandwich',
        'cookbook': 'N/A',
        'ingredients': [
          {
            'name': 'peanut butter',
            'type': 'pantry',
          },
          {
            'name': 'bread',
            'type': 'bakery',
          },
        ],
      },
      {
        'name': 'peanut butter',
        'cookbook': 'N/A',
        'ingredients': [
          {
            'name': 'peanut butter',
            'type': 'pantry',
          },
        ],
      },
    ];
    const ingredientsByType = util.getIngredientsGroupedByType(recipes);
    expect(ingredientsByType.get('pantry')).toEqual(new Set(['peanut butter']));
  });

  test('ensure all ingredients are present', () => {
    const recipes = [
      {
        'name': 'peanut butter and jelly',
        'cookbook': 'N/A',
        'ingredients': [
          {
            'name': 'peanut butter',
            'type': 'pantry',
          },
          {
            'name': 'jelly',
            'type': 'refrigerator',
          },
          {
            'name': 'bread',
            'type': 'bakery',
          },
        ],
      },
      {
        'name': 'coffee',
        'cookbook': 'N/A',
        'ingredients': [
          {
            'name': 'coffee',
            'type': 'pantry',
          },
          {
            'name': 'soy milk',
            'type': 'refrigerator',
          },
        ],
      },
    ];
    const ingredientsByType = util.getIngredientsGroupedByType(recipes);
    const expected = new Map([
      ['pantry', new Set(['peanut butter', 'coffee'])],
      ['refrigerator', new Set(['soy milk', 'jelly'])],
      ['bakery', new Set(['bread'])],
    ]);

    expect(ingredientsByType).toEqual(expected);
  });
});

describe('buildIndex', () => {
  test('ensure all recipes are in index', () => {
    const recipes = [
      {
        'name': 'peanut butter and jelly',
        'cookbook': 'N/A',
        'ingredients': [
          {
            'name': 'peanut butter',
            'type': 'pantry',
          },
          {
            'name': 'jelly',
            'type': 'refrigerator',
          },
          {
            'name': 'bread',
            'type': 'bakery',
          },
        ],
      },
      {
        'name': 'coffee',
        'cookbook': 'N/A',
        'ingredients': [
          {
            'name': 'coffee',
            'type': 'pantry',
          },
          {
            'name': 'soy milk',
            'type': 'refrigerator',
          },
        ],
      },
    ];
    const indexOfRecipes = util.buildIndex(recipes);

    const expectedPBJ = {
      name: 'peanut butter and jelly',
      cookbook: 'N/A',
      ingredients: new Set(['peanut butter', 'jelly', 'bread']),
    };
    expect(indexOfRecipes).toContainEqual(expectedPBJ);

    const expectedCoffee = {
      name: 'coffee',
      cookbook: 'N/A',
      ingredients: new Set(['coffee', 'soy milk']),
    };

    expect(indexOfRecipes).toContainEqual(expectedCoffee);
  });
});

describe('findRecipes', () => {
  test('return recipe made of available ingredients', () => {
    const recipes = [{
      name: 'peanut butter and jelly',
      cookbook: 'N/A',
      ingredients: new Set(['peanut butter', 'jelly', 'bread']),
    },
    {
      name: 'coffee',
      cookbook: 'N/A',
      ingredients: new Set(['coffee', 'soy milk']),
    }];

    expect(util.findRecipes(recipes, ['coffee', 'bread', 'soy milk'])).toEqual(['coffee']);
  });
});
