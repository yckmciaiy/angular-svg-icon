/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, KeyValueDiffers, Renderer2 } from '@angular/core';
import { SvgIconRegistryService } from './svg-icon-registry.service';
export class SvgIconComponent {
    /**
     * @param {?} element
     * @param {?} differs
     * @param {?} renderer
     * @param {?} iconReg
     */
    constructor(element, differs, renderer, iconReg) {
        this.element = element;
        this.differs = differs;
        this.renderer = renderer;
        this.iconReg = iconReg;
        this.stretch = false;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set svgStyle(v) {
        this._svgStyle = v;
        if (!this.differ && v) {
            this.differ = this.differs.find(v).create();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
    /**
     * @param {?} changeRecord
     * @return {?}
     */
    ngOnChanges(changeRecord) {
        if (changeRecord['src'] || changeRecord['name']) {
            if (this.svg) {
                this.destroy();
            }
            this.init();
        }
        if (changeRecord['stretch']) {
            this.stylize();
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.svg && this.differ) {
            /** @type {?} */
            const changes = this.differ.diff(this._svgStyle);
            if (changes) {
                this.applyChanges(changes);
            }
        }
    }
    /**
     * @return {?}
     */
    init() {
        if (this.name) {
            this.icnSub = this.iconReg.getSvgByName(this.name).subscribe(this.initSvg.bind(this));
            return;
        }
        this.icnSub = this.iconReg.loadSvg(this.src).subscribe(this.initSvg.bind(this));
    }
    /**
     * @param {?} svg
     * @return {?}
     */
    initSvg(svg) {
        this.setSvg(svg);
        this.resetDiffer();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.svg = undefined;
        this.differ = undefined;
        if (this.icnSub) {
            this.icnSub.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    resetDiffer() {
        if (this._svgStyle && !this.differ) {
            this.differ = this.differs.find(this._svgStyle).create();
        }
    }
    /**
     * @param {?} svg
     * @return {?}
     */
    setSvg(svg) {
        if (svg) {
            this.svg = svg;
            /** @type {?} */
            const icon = /** @type {?} */ (svg.cloneNode(true));
            /** @type {?} */
            const elem = this.element.nativeElement;
            elem.innerHTML = '';
            this.renderer.appendChild(elem, icon);
            this.stylize();
        }
    }
    /**
     * @return {?}
     */
    stylize() {
        if (this.svg) {
            /** @type {?} */
            const svg = this.element.nativeElement.firstChild;
            if (this.stretch === true) {
                this.renderer.setAttribute(svg, 'preserveAspectRatio', 'none');
            }
            else if (this.stretch === false) {
                this.renderer.removeAttribute(svg, 'preserveAspectRatio');
            }
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    applyChanges(changes) {
        changes.forEachRemovedItem((record) => this.setStyle(record.key, null));
        changes.forEachAddedItem((record) => this.setStyle(record.key, record.currentValue));
        changes.forEachChangedItem((record) => this.setStyle(record.key, record.currentValue));
    }
    /**
     * @param {?} nameAndUnit
     * @param {?} value
     * @return {?}
     */
    setStyle(nameAndUnit, value) {
        const [name, unit] = nameAndUnit.split('.');
        value = value !== null && unit ? `${value}${unit}` : value;
        /** @type {?} */
        const svg = this.element.nativeElement.firstChild;
        if (value !== null) {
            this.renderer.setStyle(svg, name, /** @type {?} */ (value));
        }
        else {
            this.renderer.removeStyle(svg, name);
        }
    }
}
SvgIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'svg-icon',
                template: '<ng-content></ng-content>',
                styles: [`:host { display: inline-block; }`]
            }] }
];
/** @nocollapse */
SvgIconComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: KeyValueDiffers },
    { type: Renderer2 },
    { type: SvgIconRegistryService }
];
SvgIconComponent.propDecorators = {
    src: [{ type: Input }],
    name: [{ type: Input }],
    stretch: [{ type: Input }],
    svgStyle: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SvgIconComponent.prototype.src;
    /** @type {?} */
    SvgIconComponent.prototype.name;
    /** @type {?} */
    SvgIconComponent.prototype.stretch;
    /** @type {?} */
    SvgIconComponent.prototype.svg;
    /** @type {?} */
    SvgIconComponent.prototype.icnSub;
    /** @type {?} */
    SvgIconComponent.prototype.differ;
    /** @type {?} */
    SvgIconComponent.prototype._svgStyle;
    /** @type {?} */
    SvgIconComponent.prototype.element;
    /** @type {?} */
    SvgIconComponent.prototype.differs;
    /** @type {?} */
    SvgIconComponent.prototype.renderer;
    /** @type {?} */
    SvgIconComponent.prototype.iconReg;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zdmctaWNvbi8iLCJzb3VyY2VzIjpbInNyYy9zdmctaWNvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVcsVUFBVSxFQUFlLEtBQUssRUFDSCxlQUFlLEVBQ3hDLFNBQVMsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFJOUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFTckUsTUFBTTs7Ozs7OztJQW1CTCxZQUFvQixPQUFrQixFQUM3QixTQUNBLFVBQ0E7UUFIVyxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQzdCLFlBQU8sR0FBUCxPQUFPO1FBQ1AsYUFBUSxHQUFSLFFBQVE7UUFDUixZQUFPLEdBQVAsT0FBTzt1QkFuQkcsS0FBSztLQW9CdkI7Ozs7O0lBakJELElBQ0ksUUFBUSxDQUFDLENBQTBCO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDNUM7S0FDRDs7OztJQWFELFFBQVE7UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDWjs7OztJQUVELFdBQVc7UUFDVixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDZjs7Ozs7SUFFRCxXQUFXLENBQUMsWUFBeUM7UUFDcEQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWjtRQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2Y7S0FDRDs7OztJQUVELFNBQVM7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztZQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO1NBQ0Q7S0FDRDs7OztJQUVPLElBQUk7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLE1BQU0sQ0FBQztTQUNQO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUd6RSxPQUFPLENBQUMsR0FBZTtRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7SUFHWixPQUFPO1FBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMxQjs7Ozs7SUFHTSxXQUFXO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN6RDs7Ozs7O0lBR00sTUFBTSxDQUFDLEdBQWM7UUFDNUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztZQUNmLE1BQU0sSUFBSSxxQkFBZSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDOztZQUM3QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2Y7Ozs7O0lBR00sT0FBTztRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztZQUNkLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztZQUVsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMvRDtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Q7Ozs7OztJQUdNLFlBQVksQ0FBQyxPQUErQztRQUNuRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFrRCxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwSCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFrRCxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDakksT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBa0QsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBRzVILFFBQVEsQ0FBQyxXQUFtQixFQUFFLEtBQW1DO1FBQ3hFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxLQUFLLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O1FBQzNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUVsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxvQkFBRSxLQUFlLEVBQUMsQ0FBQztTQUNuRDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDOzs7O1lBL0hGLFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsVUFBVTtnQkFFcEIsUUFBUSxFQUFFLDJCQUEyQjt5QkFEM0Isa0NBQWtDO2FBRTVDOzs7O1lBYjRCLFVBQVU7WUFDaUIsZUFBZTtZQUN4QyxTQUFTO1lBSS9CLHNCQUFzQjs7O2tCQVU3QixLQUFLO21CQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEb0NoZWNrLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsXG5cdEtleVZhbHVlQ2hhbmdlUmVjb3JkLCBLZXlWYWx1ZUNoYW5nZXMsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsXG5cdE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi9zdmctaWNvbi1yZWdpc3RyeS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdzdmctaWNvbicsXG5cdHN0eWxlczogWyBgOmhvc3QgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1gIF0sXG5cdHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5cbmV4cG9ydCBjbGFzcyBTdmdJY29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgRG9DaGVjayB7XG5cdEBJbnB1dCgpIHNyYzpzdHJpbmc7XG5cdEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuXHRASW5wdXQoKSBzdHJldGNoID0gZmFsc2U7XG5cblx0Ly8gQWRhcHRlZCBmcm9tIG5nU3R5bGVcblx0QElucHV0KClcblx0c2V0IHN2Z1N0eWxlKHY6IHtba2V5OnN0cmluZ106IHN0cmluZyB9KSB7XG5cdFx0dGhpcy5fc3ZnU3R5bGUgPSB2O1xuXHRcdGlmICghdGhpcy5kaWZmZXIgJiYgdikge1xuXHRcdFx0dGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2KS5jcmVhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHN2ZzpTVkdFbGVtZW50O1xuXHRwcml2YXRlIGljblN1YjpTdWJzY3JpcHRpb247XG5cdHByaXZhdGUgZGlmZmVyOktleVZhbHVlRGlmZmVyPHN0cmluZywgc3RyaW5nfG51bWJlcj47XG5cdHByaXZhdGUgX3N2Z1N0eWxlOiB7W2tleTpzdHJpbmddOnN0cmluZ307XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OkVsZW1lbnRSZWYsXG5cdFx0cHJpdmF0ZSBkaWZmZXJzOktleVZhbHVlRGlmZmVycyxcblx0XHRwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyMixcblx0XHRwcml2YXRlIGljb25SZWc6U3ZnSWNvblJlZ2lzdHJ5U2VydmljZSkge1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLmRlc3Ryb3koKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZVJlY29yZDoge1trZXk6c3RyaW5nXTpTaW1wbGVDaGFuZ2V9KSB7XG5cdFx0aWYgKGNoYW5nZVJlY29yZFsnc3JjJ10gfHwgY2hhbmdlUmVjb3JkWyduYW1lJ10pIHtcblx0XHRcdGlmICh0aGlzLnN2Zykge1xuXHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlUmVjb3JkWydzdHJldGNoJ10pIHtcblx0XHRcdHRoaXMuc3R5bGl6ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nRG9DaGVjaygpIHtcblx0XHRpZiAodGhpcy5zdmcgJiYgdGhpcy5kaWZmZXIpIHtcblx0XHRcdGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMuX3N2Z1N0eWxlKTtcblx0XHRcdGlmIChjaGFuZ2VzKSB7XG5cdFx0XHRcdHRoaXMuYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaW5pdCgpIHtcblx0XHRpZiAodGhpcy5uYW1lKSB7XG5cdFx0XHR0aGlzLmljblN1YiA9IHRoaXMuaWNvblJlZy5nZXRTdmdCeU5hbWUodGhpcy5uYW1lKS5zdWJzY3JpYmUodGhpcy5pbml0U3ZnLmJpbmQodGhpcykpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmljblN1YiA9IHRoaXMuaWNvblJlZy5sb2FkU3ZnKHRoaXMuc3JjKS5zdWJzY3JpYmUodGhpcy5pbml0U3ZnLmJpbmQodGhpcykpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbml0U3ZnKHN2ZzogU1ZHRWxlbWVudCk6IHZvaWQge1xuXHRcdHRoaXMuc2V0U3ZnKHN2Zyk7XG5cdFx0dGhpcy5yZXNldERpZmZlcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBkZXN0cm95KCkge1xuXHRcdHRoaXMuc3ZnID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZGlmZmVyID0gdW5kZWZpbmVkO1xuXHRcdGlmICh0aGlzLmljblN1Yikge1xuXHRcdFx0dGhpcy5pY25TdWIudW5zdWJzY3JpYmUoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlc2V0RGlmZmVyKCkge1xuXHRcdGlmICh0aGlzLl9zdmdTdHlsZSAmJiAhdGhpcy5kaWZmZXIpIHtcblx0XHRcdHRoaXMuZGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5fc3ZnU3R5bGUpLmNyZWF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc2V0U3ZnKHN2ZzpTVkdFbGVtZW50KSB7XG5cdFx0aWYgKHN2Zykge1xuXHRcdFx0dGhpcy5zdmcgPSBzdmc7XG5cdFx0XHRjb25zdCBpY29uID0gPFNWR0VsZW1lbnQ+c3ZnLmNsb25lTm9kZSh0cnVlKTtcblx0XHRcdGNvbnN0IGVsZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdFx0ZWxlbS5pbm5lckhUTUwgPSAnJztcblx0XHRcdHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWxlbSwgaWNvbik7XG5cblx0XHRcdHRoaXMuc3R5bGl6ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc3R5bGl6ZSgpIHtcblx0XHRpZiAodGhpcy5zdmcpIHtcblx0XHRcdGNvbnN0IHN2ZyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRcdGlmICh0aGlzLnN0cmV0Y2ggPT09IHRydWUpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAncHJlc2VydmVBc3BlY3RSYXRpbycsICdub25lJyk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RyZXRjaCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUoc3ZnLCAncHJlc2VydmVBc3BlY3RSYXRpbycpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXBwbHlDaGFuZ2VzKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIHN0cmluZ3xudW1iZXI+KSB7XG5cdFx0Y2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZDpLZXlWYWx1ZUNoYW5nZVJlY29yZDxzdHJpbmcsIHN0cmluZ3xudW1iZXI+KSA9PiB0aGlzLnNldFN0eWxlKHJlY29yZC5rZXksIG51bGwpKTtcblx0XHRjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKHJlY29yZDpLZXlWYWx1ZUNoYW5nZVJlY29yZDxzdHJpbmcsIHN0cmluZ3xudW1iZXI+KSA9PiB0aGlzLnNldFN0eWxlKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpKTtcblx0XHRjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbSgocmVjb3JkOktleVZhbHVlQ2hhbmdlUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bWJlcj4pID0+IHRoaXMuc2V0U3R5bGUocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSkpO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXRTdHlsZShuYW1lQW5kVW5pdDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfG51bWJlcnxudWxsfHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IFtuYW1lLCB1bml0XSA9IG5hbWVBbmRVbml0LnNwbGl0KCcuJyk7XG5cdFx0dmFsdWUgPSB2YWx1ZSAhPT0gbnVsbCAmJiB1bml0ID8gYCR7dmFsdWV9JHt1bml0fWAgOiB2YWx1ZTtcblx0XHRjb25zdCBzdmcgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5maXJzdENoaWxkO1xuXG5cdFx0aWYgKHZhbHVlICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHN2ZywgbmFtZSwgdmFsdWUgYXMgc3RyaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShzdmcsIG5hbWUpO1xuXHRcdH1cblx0fVxufVxuIl19