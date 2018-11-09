import { DoCheck, ElementRef, KeyValueDiffers, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChange } from '@angular/core';
import { SvgIconRegistryService } from './svg-icon-registry.service';
export declare class SvgIconComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
    private element;
    private differs;
    private renderer;
    private iconReg;
    src: string;
    name: string;
    stretch: boolean;
    svgStyle: {
        [key: string]: string;
    };
    private svg;
    private icnSub;
    private differ;
    private _svgStyle;
    constructor(element: ElementRef, differs: KeyValueDiffers, renderer: Renderer2, iconReg: SvgIconRegistryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changeRecord: {
        [key: string]: SimpleChange;
    }): void;
    ngDoCheck(): void;
    private init();
    private initSvg(svg);
    private destroy();
    private resetDiffer();
    private setSvg(svg);
    private stylize();
    private applyChanges(changes);
    private setStyle(nameAndUnit, value);
}
