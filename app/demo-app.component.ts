import { Component } from '@angular/core';

import { SvgIconComponent } from './svg-icon.component';

@Component({
	selector: 'demo-app',
	styles : [ 'fieldset input { margin-right: 10px; }' ],
	templateUrl: 'app/demo-app.component.html'
})

export class DemoAppComponent {
	private r:number = 120;
	private g:number = 120;
	private b:number = 120;
	private w:number = 75;

	getStyle(): string {
		return 'width:' + this.w + 'px;fill:rgb(' + this.r + ',' + this.g + ',' + this.b + ');';
	}
}
