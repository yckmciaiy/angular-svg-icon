import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';


import { SvgIconComponent, SVG_ICON_REGISTRY_PROVIDER } from './svg-icon.component';

@NgModule({
	imports:	  [
		CommonModule,
		HttpModule
	],
	declarations: [ SvgIconComponent ],
	providers:    [ SVG_ICON_REGISTRY_PROVIDER ],
	exports:      [ SvgIconComponent ]
})

export class AngularSvgIconModule {}
