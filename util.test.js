const util = require('./util');

test('remove duplicate ingredients', () => {
    const recipes = [
        {
            "name": "peanut butter",
            "cookbook": "N/A",
            "ingredients": [
                {
                    "name": "peanut butter",
                    "type": "pantry"
                }
            ]
        },
        {
            "name": "peanut butter",
            "cookbook": "N/A",
            "ingredients": [
                {
                    "name": "peanut butter",
                    "type": "pantry"
                }
            ]
        }
    ]
    ingredientsByType = util.getIngredientsGroupedByType(recipes);
    expect(ingredientsByType["pantry"]).toEqual(new Set(["peanut butter"]));
});

test('ensure all ingredients are present', () => {
    const recipes = [
        {
            "name": "peanut butter and jelly",
            "cookbook": "N/A",
            "ingredients": [
                {
                    "name": "peanut butter",
                    "type": "pantry"
                },
                {
                    "name":"jelly",
                    "type": "refrigerator"
                },
                {
                    "name": "bread",
                    "type": "bakery"
                }
            ]
        },
        {
            "name": "coffee",
            "cookbook": "N/A",
            "ingredients": [
                {
                    "name": "coffee",
                    "type": "pantry"
                },
                {
                    "name":"soy milk",
                    "type": "refrigerator"
                }
            ]
        }
    ]
    ingredientsByType = util.getIngredientsGroupedByType(recipes);
    expect(ingredientsByType["pantry"]).toEqual(new Set(["peanut butter", "coffee"]));
    expect(ingredientsByType["refrigerator"]).toEqual(new Set(["soy milk", "jelly"]));
    expect(ingredientsByType["bakery"]).toEqual(new Set(["bread"]));
});