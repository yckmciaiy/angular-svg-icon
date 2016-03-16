import {Component} from 'angular2/core';
import {SvgIconComponent} from './svg-icon.component';

@Component({
	selector: 'demo-app',
	directives: [ SvgIconComponent ],
	template: `
		<div style="width:100px;">
			<svg-icon src="images/eye.svg" style="fill:red;"></svg-icon>
			<svg-icon src="images/eye.svg" style="fill:green;"></svg-icon>
			<svg-icon src="images/eye.svg" style="fill:blue;"></svg-icon>
		</div>
	`
})

export class DemoAppComponent { 
}

