import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
	selector: 'svg-icon',
	template: `<div [innerHTML]="iconData"></div>`
})


export class SvgIconComponent implements OnInit {
	@Input() src:string;

	private iconData:any;

	constructor(private http:Http, private sanitizer:DomSanitizer) {
	}

	ngOnInit() {
		this.loadSvg();
	}

	loadSvg() {
		this.http.get( this.src )
			.map( (res: Response) => res.text() )
			.subscribe(
				data => {
					this.iconData = this.sanitizer.bypassSecurityTrustHtml(data);
				},
				err => { console.error(err); }
			);
	}

}
