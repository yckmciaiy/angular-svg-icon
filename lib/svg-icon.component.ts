import { Component, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit,
	Renderer2, RendererStyleFlags2, SimpleChange } from '@angular/core';
import { NgStyle } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import { SvgIconRegistryService } from './svg-icon-registry.service';


@Component({
	selector: 'svg-icon',
	styles: [ `:host { display: inline-block; }` ],
	template: '<ng-content></ng-content>'
})

export class SvgIconComponent implements OnInit, OnDestroy, OnChanges {
	@Input() src:string;
	@Input() stretch = false;
	@Input() svgStyle:NgStyle;

	private svg:SVGElement;
	private icnSub:Subscription;

	constructor(private element:ElementRef,
		private renderer2:Renderer2,
		private iconReg:SvgIconRegistryService) {
	}

	ngOnInit() {
		this.init();
	}

	ngOnDestroy() {
		this.destroy();
	}

	ngOnChanges(changeRecord: {[key:string]:SimpleChange}) {
		if (changeRecord['src']) {
			this.destroy();
			this.init();
		}

		if (changeRecord['stretch'] || changeRecord['svgStyle']) {
			this.stylize();
		}
	}

	private init() {
		this.icnSub = this.iconReg.loadSvg(this.src).subscribe(svg => {
			this.setSvg(svg);
		});
	}

	private destroy() {
		if (this.icnSub) {
			this.icnSub.unsubscribe();
		}
	}

	private setSvg(svg:SVGElement) {
		if (svg) {
			this.svg = svg;
			const icon = <SVGElement>svg.cloneNode(true);
			const elem = this.element.nativeElement;

			elem.innerHTML = '';
			this.renderer2.appendChild(elem, icon);

			this.stylize();
		}
	}

	private clearStyles(icon:Node) {
		if (icon.style) {
			while (icon.style.length) {
				let i = icon.style.length - 1;
				this.renderer2.removeStyle(icon, icon.style[i]);
			}
		}
	}

	private stylize() {
		if (this.svg) {
			const elem = this.element.nativeElement;
			const icon = elem.firstChild;

			this.clearStyles(icon);

			if (this.stretch === true) {
				this.renderer2.setAttribute(icon, 'preserveAspectRatio', 'none');
			} else if (this.stretch === false) {
				this.renderer2.removeAttribute(icon, 'preserveAspectRatio');
			}

			if (this.svgStyle) {
				for (let key in this.svgStyle) {
					this.renderer2.setStyle(icon, key, this.svgStyle[key]);
				}
			}
		}
	}
}
