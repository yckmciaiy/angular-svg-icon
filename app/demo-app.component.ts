import {Component} from 'angular2/core';
import {SvgIconComponent} from './svg-icon.component';

@Component({
	selector: 'demo-app',
	directives: [ SvgIconComponent ],
	template: `
		<div style="width:100px;">
			<div style="fill:red;">
				<svg-icon src="images/eye.svg"></svg-icon>
			</div>
			<div style="fill:green;">
				<svg-icon src="images/eye.svg"></svg-icon>
			</div>
			<div style="fill:blue;">
				<svg-icon src="images/eye.svg"></svg-icon>
			</div>
		</div>
	`
})

export class DemoAppComponent { 
}

