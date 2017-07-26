import { Component } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon/index';


@Component({
	selector: 'demo-app',
	styleUrls: [ 'app/demo-app.component.css' ],
	templateUrl: 'app/demo-app.component.html'
})

export class DemoAppComponent {
	private r = 120;
	private g = 120;
	private b = 120;
	private w = 175;

	display = true;

	constructor(private registry:SvgIconRegistryService) {
	}

	getStyle(): string {
		return 'width:' + this.w + 'px;fill:rgb(' + this.r + ',' + this.g + ',' + this.b + ');';
	}

	unload(url:string) {
		this.registry.unloadSvg(url);
	}

}
