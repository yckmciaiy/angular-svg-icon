[![npm version](https://badge.fury.io/js/angular-svg-icon.svg)](https://badge.fury.io/js/angular-svg-icon)

Angular SVG Icon 
=========

The **angular-svg-icon** is an Angular 2+ service and component that provides a 
means to inline SVG images to allow for them to be easily styled by CSS and 
code.

The service provides an icon registery that loads and caches a svg indexed by 
its url. The component is responsible for displaying the svg. After getting the 
svg from the registry it clones the `SVGElement` and the svg to the component's 
inner HTML.

A [working demo](http://czeckd.github.io/angular-svg-icon/demo/) shows solution 
in action.

## How to use?
```
$ npm i angular-svg-icon --save
```

## Integration

Import `HttpModule`, `SvgIconComponent`, and `SvgIconRegistryService` into your
app's main module. Example:

```typescript
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    imports: [ AngularSvgIconModule ],
    ...
})
export class AppModule {}
```
## Usage
Basic usage is:
```html
<svg-icon src="path/to/icon.svg"></svg-icon>
```
An example of styling the svg:
```html
<svg-icon src="images/eye.svg" style="fill:green;width:90px;"></svg-icon>
```

## Background

The svg-icon is an Angular 2 component that allows for the continuation of the 
AngularJS method for easily inlining SVGs explained by [Ben 
Markowitz](https://www.mobomo.com/2014/09/angular-js-svg/) and others. Including 
the SVG source inline allows for the graphic to be easily styled by CSS.

The technique made use of ng-include to inline the svg source into the document. 
Angular 2, however, drops the support of ng-include, so this is my work-around 
method.

*Note:* The [icon 
component](https://www.npmjs.com/package/@angular2-material/icon) from 
[angular/material2](https://github.com/angular/material2) used to have a direct 
means to load svg similar to this, but this functionality was removed because of 
security concerns.

## License

MIT


## Author
- David Czeck [@czeckd](https://github/czeckd)

