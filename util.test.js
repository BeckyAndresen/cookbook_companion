const util = require('./util');

test.skip('remove duplicate ingredients', () => {
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
    util.storeIngredients(recipes);
});

test.todo('ensure all ingredients are present');

test.todo('ensure ingredients are sorted by type');