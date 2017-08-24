import { Component } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';


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
	img = [ 'images/eye.svg', 'images/moon-o.svg' ];
	onImg = 0;
	message = '';

	constructor(private registry:SvgIconRegistryService) {
	}

	getStyle(): string {
		return 'width:' + this.w + 'px;fill:rgb(' + this.r + ',' + this.g + ',' + this.b + ');';
	}

	unload(url:string) {
		if (this.display) {
			this.display = false;
			this.registry.unloadSvg(url);

			setTimeout( () => {
				this.message = '';
			}, 2000);

			this.message = url + ' unloaded';

		} else {
			this.display = true;
		}
	}

	swapImg() {
		this.onImg = (this.onImg === 1 ? 0 : 1);
	}

}
