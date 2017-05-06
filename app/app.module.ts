import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { DemoAppComponent } from './demo-app.component';

@NgModule({
	imports:         [ BrowserModule, FormsModule, AngularSvgIconModule ],
	declarations:    [ DemoAppComponent ],
	bootstrap:       [ DemoAppComponent ]

})
export class AppModule {}
