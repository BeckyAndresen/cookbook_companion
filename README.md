# Cookbook Companion

The Cookbook Companion helps you figure out what recipes you can make with what you have on hand. Select the ingredients you have and see which recipes you can make!

[You can try the Cookbook Companion with test data on GitHub Pages here.](https://beckyandresen.github.io/cookbook_companion/) It has only been tested in recent versions of Chrome, Firefox, and Edge.

## Demonstrated Practices
* Separation of [data](https://github.com/BeckyAndresen/cookbook_companion/blob/main/simple_recipes.json), [data processing](https://github.com/BeckyAndresen/cookbook_companion/blob/main/util.js), and [display logic](https://github.com/BeckyAndresen/cookbook_companion/blob/main/index.js)
* [Automated testing](https://github.com/BeckyAndresen/cookbook_companion/blob/main/util.test.js)
* [Linting and style consistency](https://github.com/BeckyAndresen/cookbook_companion/blob/main/.eslintrc.json)
* Intentional scope management via [Immediately Invoked Function Expressions](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
* Asynchronous programming via a [jQuery AJAX callback](https://github.com/BeckyAndresen/cookbook_companion/blob/main/index.js)

## Setup
* install git, node, and npm
* clone this repository
* run `npm install`

## Tests
* run `npm run test`

## Run Locally
* install python3
* run `python3 -m http.server`
* visit the URL `http://localhost:8000/` in a web browser