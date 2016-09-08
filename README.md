# angular2-svg-icon

*Please note*: this component is deprecated in favor of the [icon 
component](https://www.npmjs.com/package/@angular2-material/icon) from 
[angular/material2](https://github.com/angular/material2).

## Background

The svg-icon is an Angular 2 component that allows for the continuation of the 
AngularJS method for easily inlining SVGs explained by [Ben 
Markowitz](https://www.mobomo.com/2014/09/angular-js-svg/) and others. 
Including the SVG source inline allows for the graphic to be easily styled by 
CSS.

The technique made use of ng-include to inline the svg source into the 
document. Angular 2, however, drops the support of ng-include, so this is my 
work-around method.

## Demo

A [working demo](http://czeckd.github.io/angular2-svg-icon/demo/) shows the 
component in action. The demo shows an SVG image styled with CSS fill to be 
red, green, and blue. It provides a form where width and fill color can be 
adjusted and displays the corresponding HTML and CSS.

## Usage

Copy `svg-icon.component.ts` into your app. Import the SvgIconComponent into a 
component and include it in that component's directives. For a usage example, 
see `app/demo-app.component.ts`. 

Additionally, set-up `HTTP_PROVIDERS` in your app's bootstrap method and 
import `rxjs/add/operator/map` to use the map. See `main.ts` for an example. 
Note that `http.dev.js` from angular2 will also need to be added to the html 
page where the angular2 scripts are loaded.


### Getting started

1. Clone this repo
1. Install the dependencies:
	```
    npm install
	```
1. Run the TypeScript compiler and start the server:
	```
	npm start
	```

## License

MIT


## Author
- David Czeck [@czeckd](https://github/czeckd)
