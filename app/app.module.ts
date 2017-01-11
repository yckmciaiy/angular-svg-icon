import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SvgIconComponent } from './svg-icon.component';
import { DemoAppComponent } from './demo-app.component';


@NgModule({
	imports:         [ BrowserModule, FormsModule, HttpModule ],
	declarations:    [ DemoAppComponent, SvgIconComponent ],
	bootstrap:       [ DemoAppComponent ]
})
export class AppModule {}
