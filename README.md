# angular-svg-icon

## Demo

The [working demo](http://czeckd.github.io/angular-svg-icon/demo/) shows the 
component and registry service in action. The demo provides a form where width 
and fill color can be adjusted and displays the corresponding HTML and CSS.

## svg-icon

The `svg-icon` is comprised of two parts: an icon registery and a component. The
icon registry is responsible for loading and caching a svg, which is indexed by
its url.

The component is responsible for displaying the svg. After getting the svg from
the registry it clones the `SVGElement` and the svg to the component's inner 
HTML.

## Background

The svg-icon is an Angular 2 component that allows for the continuation of the 
AngularJS method for easily inlining SVGs explained by [Ben 
Markowitz](https://www.mobomo.com/2014/09/angular-js-svg/) and others. 
Including the SVG source inline allows for the graphic to be easily styled by 
CSS.

The technique made use of ng-include to inline the svg source into the 
document. Angular 2, however, drops the support of ng-include, so this is my 
work-around method.

The [icon component](https://www.npmjs.com/package/@angular2-material/icon) from 
[angular/material2](https://github.com/angular/material2) used to have a direct
means to load svg using the `<md-icon svgSrc="">` component attribute. This was
removed due to security concerns. Those concerns still relevant for this component.

## Usage

Import `HttpModule`, `SvgIconComponent`, and `SvgIconRegistryService` into your
app's main module. Example:

```
import { HttpModule } from '@angular/http';

import { SvgIconComponent } from './svg-icon.component';
import { SvgIconRegistryService } from './svg-icon-registry.service';


@NgModule({
    imports:         [ HttpModule ],
    declarations:    [ SvgIconComponent ],
    providers:       [ SvgIconRegistryService ]
})
```

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
