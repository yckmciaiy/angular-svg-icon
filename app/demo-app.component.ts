import { Component } from '@angular/core';

@Component({
	selector: 'demo-app',
	styles : [ 'fieldset input { margin-right: 10px; }' ],
	templateUrl: 'app/demo-app.component.html'
})

export class DemoAppComponent {
	private r = 120;
	private g = 120;
	private b = 120;
	private w = 75;

	getStyle(): string {
		return 'width:' + this.w + 'px;fill:rgb(' + this.r + ',' + this.g + ',' + this.b + ');';
	}
}
