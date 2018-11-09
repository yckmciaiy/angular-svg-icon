import { Injectable, Optional, SkipSelf, Component, ElementRef, Input, KeyValueDiffers, Renderer2, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { map, tap, catchError, finalize, share } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SvgIconRegistryService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.iconsByUrl = new Map();
        this.iconsLoadingByUrl = new Map();
    }
    /**
     * Add a SVG to the registry by passing a name and the SVG.
     * @param {?} name
     * @param {?} data
     * @return {?}
     */
    addSvg(name, data) {
        if (!this.iconsByUrl.has(name)) {
            /** @type {?} */
            const div = document.createElement('DIV');
            div.innerHTML = data;
            /** @type {?} */
            const svg = /** @type {?} */ (div.querySelector('svg'));
            this.iconsByUrl.set(name, svg);
        }
    }
    /**
     * Load a SVG to the registry from a URL.
     * @param {?} url
     * @param {?=} name
     * @return {?}
     */
    loadSvg(url, name = url) {
        if (this.iconsByUrl.has(name)) {
            return of(this.iconsByUrl.get(name));
        }
        else if (this.iconsLoadingByUrl.has(name)) {
            return this.iconsLoadingByUrl.get(name);
        }
        /** @type {?} */
        const o = /** @type {?} */ (this.http.get(url, { responseType: 'text' }).pipe(map(svg => {
            /** @type {?} */
            const div = document.createElement('DIV');
            div.innerHTML = svg;
            return /** @type {?} */ (div.querySelector('svg'));
        }), tap(svg => this.iconsByUrl.set(name, svg)), catchError(err => {
            console.error(err);
            return throwError(err);
        }), finalize(() => this.iconsLoadingByUrl.delete(name)), share()));
        this.iconsLoadingByUrl.set(name, o);
        return o;
    }
    /**
     * Get loaded SVG from registry by name. (also works by url because of blended map)
     * @param {?} name
     * @return {?}
     */
    getSvgByName(name) {
        if (this.iconsByUrl.has(name)) {
            return of(this.iconsByUrl.get(name));
        }
        else if (this.iconsLoadingByUrl.has(name)) {
            return this.iconsLoadingByUrl.get(name);
        }
        return throwError(`No svg with name '${name}' has been loaded`);
    }
    /**
     * Remove a SVG from the registry by URL (or name).
     * @param {?} url
     * @return {?}
     */
    unloadSvg(url) {
        if (this.iconsByUrl.has(url)) {
            this.iconsByUrl.delete(url);
        }
    }
}
SvgIconRegistryService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SvgIconRegistryService.ctorParameters = () => [
    { type: HttpClient }
];
/**
 * @param {?} parentRegistry
 * @param {?} http
 * @return {?}
 */
function SVG_ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, http) {
    return parentRegistry || new SvgIconRegistryService(http);
}
/** @type {?} */
const SVG_ICON_REGISTRY_PROVIDER = {
    provide: SvgIconRegistryService,
    deps: [[new Optional(), new SkipSelf(), SvgIconRegistryService], HttpClient],
    useFactory: SVG_ICON_REGISTRY_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SvgIconComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AngularSvgIconModule {
}
AngularSvgIconModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [SvgIconComponent],
                providers: [SVG_ICON_REGISTRY_PROVIDER],
                exports: [SvgIconComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AngularSvgIconModule, SvgIconRegistryService, SVG_ICON_REGISTRY_PROVIDER_FACTORY, SVG_ICON_REGISTRY_PROVIDER, SvgIconComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zdmctaWNvbi5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci1zdmctaWNvbi9zcmMvc3ZnLWljb24tcmVnaXN0cnkuc2VydmljZS50cyIsIm5nOi8vYW5ndWxhci1zdmctaWNvbi9zcmMvc3ZnLWljb24uY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXN2Zy1pY29uL3NyYy9hbmd1bGFyLXN2Zy1pY29uLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiwgdGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAsIGNhdGNoRXJyb3IsIGZpbmFsaXplLCBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN2Z0ljb25SZWdpc3RyeVNlcnZpY2Uge1xuXG5cdHByaXZhdGUgaWNvbnNCeVVybCA9IG5ldyBNYXA8c3RyaW5nLCBTVkdFbGVtZW50PigpO1xuXHRwcml2YXRlIGljb25zTG9hZGluZ0J5VXJsID0gbmV3IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8U1ZHRWxlbWVudD4+KCk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpIHtcblx0fVxuXG5cdC8qKiBBZGQgYSBTVkcgdG8gdGhlIHJlZ2lzdHJ5IGJ5IHBhc3NpbmcgYSBuYW1lIGFuZCB0aGUgU1ZHLiAqL1xuXHRhZGRTdmcobmFtZTpzdHJpbmcsIGRhdGE6c3RyaW5nKSB7XG5cdFx0aWYgKCF0aGlzLmljb25zQnlVcmwuaGFzKG5hbWUpKSB7XG5cdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSBkYXRhO1xuXHRcdFx0Y29uc3Qgc3ZnID0gPFNWR0VsZW1lbnQ+ZGl2LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdFx0dGhpcy5pY29uc0J5VXJsLnNldChuYW1lLCBzdmcpO1xuXHRcdH1cblx0fVxuXG5cdC8qKiBMb2FkIGEgU1ZHIHRvIHRoZSByZWdpc3RyeSBmcm9tIGEgVVJMLiAqL1xuXHRsb2FkU3ZnKHVybDpzdHJpbmcsIG5hbWU6IHN0cmluZyA9IHVybCk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD4ge1xuXG5cdFx0aWYgKHRoaXMuaWNvbnNCeVVybC5oYXMobmFtZSkpIHtcblx0XHRcdHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5pY29uc0J5VXJsLmdldChuYW1lKSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmljb25zTG9hZGluZ0J5VXJsLmhhcyhuYW1lKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuZ2V0KG5hbWUpO1xuXHRcdH1cblx0XHRjb25zdCBvID0gPE9ic2VydmFibGU8U1ZHRWxlbWVudD4+IHRoaXMuaHR0cC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pLnBpcGUoXG5cdFx0XHRtYXAoc3ZnID0+IHtcblx0XHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRcdGRpdi5pbm5lckhUTUwgPSBzdmc7XG5cdFx0XHRcdHJldHVybiA8U1ZHRWxlbWVudD5kaXYucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0XHR9KSxcblx0XHRcdHRhcCAoc3ZnID0+IHRoaXMuaWNvbnNCeVVybC5zZXQobmFtZSwgc3ZnKSApLFxuXHRcdFx0Y2F0Y2hFcnJvcihlcnIgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnIpO1xuXHRcdFx0fSksXG5cdFx0XHRmaW5hbGl6ZSgoKSA9PiB0aGlzLmljb25zTG9hZGluZ0J5VXJsLmRlbGV0ZShuYW1lKSApLFxuXHRcdFx0c2hhcmUoKVxuXHRcdCk7XG5cblx0XHR0aGlzLmljb25zTG9hZGluZ0J5VXJsLnNldChuYW1lLCBvKTtcblx0XHRyZXR1cm4gbztcblx0fVxuXG5cdC8qKiBHZXQgbG9hZGVkIFNWRyBmcm9tIHJlZ2lzdHJ5IGJ5IG5hbWUuIChhbHNvIHdvcmtzIGJ5IHVybCBiZWNhdXNlIG9mIGJsZW5kZWQgbWFwKSAqL1xuXHRnZXRTdmdCeU5hbWUobmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxTVkdFbGVtZW50PiB7XG5cdFx0aWYgKHRoaXMuaWNvbnNCeVVybC5oYXMobmFtZSkpIHtcblx0XHRcdHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5pY29uc0J5VXJsLmdldChuYW1lKSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmljb25zTG9hZGluZ0J5VXJsLmhhcyhuYW1lKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuZ2V0KG5hbWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoYE5vIHN2ZyB3aXRoIG5hbWUgJyR7bmFtZX0nIGhhcyBiZWVuIGxvYWRlZGApO1xuXHR9XG5cblx0LyoqIFJlbW92ZSBhIFNWRyBmcm9tIHRoZSByZWdpc3RyeSBieSBVUkwgKG9yIG5hbWUpLiAqL1xuXHR1bmxvYWRTdmcodXJsOnN0cmluZykge1xuXHRcdGlmICh0aGlzLmljb25zQnlVcmwuaGFzKHVybCkpIHtcblx0XHRcdHRoaXMuaWNvbnNCeVVybC5kZWxldGUodXJsKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNWR19JQ09OX1JFR0lTVFJZX1BST1ZJREVSX0ZBQ1RPUlkocGFyZW50UmVnaXN0cnk6U3ZnSWNvblJlZ2lzdHJ5U2VydmljZSwgaHR0cDpIdHRwQ2xpZW50KSB7XG5cdHJldHVybiBwYXJlbnRSZWdpc3RyeSB8fCBuZXcgU3ZnSWNvblJlZ2lzdHJ5U2VydmljZShodHRwKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNWR19JQ09OX1JFR0lTVFJZX1BST1ZJREVSID0ge1xuXHRwcm92aWRlOiBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlLFxuXHRkZXBzOiBbIFtuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIFN2Z0ljb25SZWdpc3RyeVNlcnZpY2VdLCBIdHRwQ2xpZW50IF0sXG5cdHVzZUZhY3Rvcnk6IFNWR19JQ09OX1JFR0lTVFJZX1BST1ZJREVSX0ZBQ1RPUllcbn07XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCxcblx0S2V5VmFsdWVDaGFuZ2VSZWNvcmQsIEtleVZhbHVlQ2hhbmdlcywgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycyxcblx0T25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFN2Z0ljb25SZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3N2Zy1pY29uLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3N2Zy1pY29uJyxcblx0c3R5bGVzOiBbIGA6aG9zdCB7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgfWAgXSxcblx0dGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcblxuZXhwb3J0IGNsYXNzIFN2Z0ljb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBEb0NoZWNrIHtcblx0QElucHV0KCkgc3JjOnN0cmluZztcblx0QElucHV0KCkgbmFtZTpzdHJpbmc7XG5cdEBJbnB1dCgpIHN0cmV0Y2ggPSBmYWxzZTtcblxuXHQvLyBBZGFwdGVkIGZyb20gbmdTdHlsZVxuXHRASW5wdXQoKVxuXHRzZXQgc3ZnU3R5bGUodjoge1trZXk6c3RyaW5nXTogc3RyaW5nIH0pIHtcblx0XHR0aGlzLl9zdmdTdHlsZSA9IHY7XG5cdFx0aWYgKCF0aGlzLmRpZmZlciAmJiB2KSB7XG5cdFx0XHR0aGlzLmRpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHYpLmNyZWF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc3ZnOlNWR0VsZW1lbnQ7XG5cdHByaXZhdGUgaWNuU3ViOlN1YnNjcmlwdGlvbjtcblx0cHJpdmF0ZSBkaWZmZXI6S2V5VmFsdWVEaWZmZXI8c3RyaW5nLCBzdHJpbmd8bnVtYmVyPjtcblx0cHJpdmF0ZSBfc3ZnU3R5bGU6IHtba2V5OnN0cmluZ106c3RyaW5nfTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6RWxlbWVudFJlZixcblx0XHRwcml2YXRlIGRpZmZlcnM6S2V5VmFsdWVEaWZmZXJzLFxuXHRcdHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIyLFxuXHRcdHByaXZhdGUgaWNvblJlZzpTdmdJY29uUmVnaXN0cnlTZXJ2aWNlKSB7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdHRoaXMuZGVzdHJveSgpO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoY2hhbmdlUmVjb3JkOiB7W2tleTpzdHJpbmddOlNpbXBsZUNoYW5nZX0pIHtcblx0XHRpZiAoY2hhbmdlUmVjb3JkWydzcmMnXSB8fCBjaGFuZ2VSZWNvcmRbJ25hbWUnXSkge1xuXHRcdFx0aWYgKHRoaXMuc3ZnKSB7XG5cdFx0XHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXHRcdGlmIChjaGFuZ2VSZWNvcmRbJ3N0cmV0Y2gnXSkge1xuXHRcdFx0dGhpcy5zdHlsaXplKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdEb0NoZWNrKCkge1xuXHRcdGlmICh0aGlzLnN2ZyAmJiB0aGlzLmRpZmZlcikge1xuXHRcdFx0Y29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5fc3ZnU3R5bGUpO1xuXHRcdFx0aWYgKGNoYW5nZXMpIHtcblx0XHRcdFx0dGhpcy5hcHBseUNoYW5nZXMoY2hhbmdlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBpbml0KCkge1xuXHRcdGlmICh0aGlzLm5hbWUpIHtcblx0XHRcdHRoaXMuaWNuU3ViID0gdGhpcy5pY29uUmVnLmdldFN2Z0J5TmFtZSh0aGlzLm5hbWUpLnN1YnNjcmliZSh0aGlzLmluaXRTdmcuYmluZCh0aGlzKSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuaWNuU3ViID0gdGhpcy5pY29uUmVnLmxvYWRTdmcodGhpcy5zcmMpLnN1YnNjcmliZSh0aGlzLmluaXRTdmcuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRwcml2YXRlIGluaXRTdmcoc3ZnOiBTVkdFbGVtZW50KTogdm9pZCB7XG5cdFx0dGhpcy5zZXRTdmcoc3ZnKTtcblx0XHR0aGlzLnJlc2V0RGlmZmVyKCk7XG5cdH1cblxuXHRwcml2YXRlIGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5zdmcgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5kaWZmZXIgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKHRoaXMuaWNuU3ViKSB7XG5cdFx0XHR0aGlzLmljblN1Yi51bnN1YnNjcmliZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmVzZXREaWZmZXIoKSB7XG5cdFx0aWYgKHRoaXMuX3N2Z1N0eWxlICYmICF0aGlzLmRpZmZlcikge1xuXHRcdFx0dGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLl9zdmdTdHlsZSkuY3JlYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBzZXRTdmcoc3ZnOlNWR0VsZW1lbnQpIHtcblx0XHRpZiAoc3ZnKSB7XG5cdFx0XHR0aGlzLnN2ZyA9IHN2Zztcblx0XHRcdGNvbnN0IGljb24gPSA8U1ZHRWxlbWVudD5zdmcuY2xvbmVOb2RlKHRydWUpO1xuXHRcdFx0Y29uc3QgZWxlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0XHRlbGVtLmlubmVySFRNTCA9ICcnO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlbGVtLCBpY29uKTtcblxuXHRcdFx0dGhpcy5zdHlsaXplKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBzdHlsaXplKCkge1xuXHRcdGlmICh0aGlzLnN2Zykge1xuXHRcdFx0Y29uc3Qgc3ZnID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuXHRcdFx0aWYgKHRoaXMuc3RyZXRjaCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShzdmcsICdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ25vbmUnKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdHJldGNoID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShzdmcsICdwcmVzZXJ2ZUFzcGVjdFJhdGlvJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhcHBseUNoYW5nZXMoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgc3RyaW5nfG51bWJlcj4pIHtcblx0XHRjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVjb3JkOktleVZhbHVlQ2hhbmdlUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bWJlcj4pID0+IHRoaXMuc2V0U3R5bGUocmVjb3JkLmtleSwgbnVsbCkpO1xuXHRcdGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgocmVjb3JkOktleVZhbHVlQ2hhbmdlUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bWJlcj4pID0+IHRoaXMuc2V0U3R5bGUocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSkpO1xuXHRcdGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKChyZWNvcmQ6S2V5VmFsdWVDaGFuZ2VSZWNvcmQ8c3RyaW5nLCBzdHJpbmd8bnVtYmVyPikgPT4gdGhpcy5zZXRTdHlsZShyZWNvcmQua2V5LCByZWNvcmQuY3VycmVudFZhbHVlKSk7XG5cdH1cblxuXHRwcml2YXRlIHNldFN0eWxlKG5hbWVBbmRVbml0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8bnVtYmVyfG51bGx8dW5kZWZpbmVkKSB7XG5cdFx0Y29uc3QgW25hbWUsIHVuaXRdID0gbmFtZUFuZFVuaXQuc3BsaXQoJy4nKTtcblx0XHR2YWx1ZSA9IHZhbHVlICE9PSBudWxsICYmIHVuaXQgPyBgJHt2YWx1ZX0ke3VuaXR9YCA6IHZhbHVlO1xuXHRcdGNvbnN0IHN2ZyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRpZiAodmFsdWUgIT09IG51bGwpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoc3ZnLCBuYW1lLCB2YWx1ZSBhcyBzdHJpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHN2ZywgbmFtZSk7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5pbXBvcnQgeyBTVkdfSUNPTl9SRUdJU1RSWV9QUk9WSURFUiB9IGZyb20gJy4vc3ZnLWljb24tcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBTdmdJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9zdmctaWNvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOlx0ICBbXG5cdFx0Q29tbW9uTW9kdWxlLFxuXHRdLFxuXHRkZWNsYXJhdGlvbnM6IFsgU3ZnSWNvbkNvbXBvbmVudCBdLFxuXHRwcm92aWRlcnM6ICAgIFsgU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVIgXSxcblx0ZXhwb3J0czogICAgICBbIFN2Z0ljb25Db21wb25lbnQgXVxufSlcblxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTdmdJY29uTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsib2JzZXJ2YWJsZU9mIiwib2JzZXJ2YWJsZVRocm93RXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztJQVlDLFlBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXOzBCQUhkLElBQUksR0FBRyxFQUFzQjtpQ0FDdEIsSUFBSSxHQUFHLEVBQWtDO0tBR3BFOzs7Ozs7O0lBR0QsTUFBTSxDQUFDLElBQVcsRUFBRSxJQUFXO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFDL0IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7WUFDckIsTUFBTSxHQUFHLHFCQUFlLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO0tBQ0Q7Ozs7Ozs7SUFHRCxPQUFPLENBQUMsR0FBVSxFQUFFLE9BQWUsR0FBRztRQUVyQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlCLE9BQU9BLEVBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQy9DO2FBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4Qzs7UUFDRCxNQUFNLENBQUMscUJBQTRCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDbkYsR0FBRyxDQUFDLEdBQUc7O1lBQ04sTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUNwQix5QkFBbUIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBQztTQUM1QyxDQUFDLEVBQ0YsR0FBRyxDQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUUsRUFDNUMsVUFBVSxDQUFDLEdBQUc7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU9DLFVBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakMsQ0FBQyxFQUNGLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUUsRUFDcEQsS0FBSyxFQUFFLENBQ1AsRUFBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxDQUFDO0tBQ1Q7Ozs7OztJQUdELFlBQVksQ0FBQyxJQUFZO1FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsT0FBT0QsRUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDL0M7YUFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBT0MsVUFBb0IsQ0FBQyxxQkFBcUIsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO0tBQzFFOzs7Ozs7SUFHRCxTQUFTLENBQUMsR0FBVTtRQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO0tBQ0Q7OztZQTdERCxVQUFVOzs7O1lBTEYsVUFBVTs7Ozs7OztBQXFFbkIsNENBQW1ELGNBQXFDLEVBQUUsSUFBZTtJQUN4RyxPQUFPLGNBQWMsSUFBSSxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzFEOztBQUVELE1BQWEsMEJBQTBCLEdBQUc7SUFDekMsT0FBTyxFQUFFLHNCQUFzQjtJQUMvQixJQUFJLEVBQUUsQ0FBRSxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxzQkFBc0IsQ0FBQyxFQUFFLFVBQVUsQ0FBRTtJQUM5RSxVQUFVLEVBQUUsa0NBQWtDO0NBQzlDOzs7Ozs7QUM5RUQ7Ozs7Ozs7SUFrQ0MsWUFBb0IsT0FBa0IsRUFDN0IsU0FDQSxVQUNBO1FBSFcsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUM3QixZQUFPLEdBQVAsT0FBTztRQUNQLGFBQVEsR0FBUixRQUFRO1FBQ1IsWUFBTyxHQUFQLE9BQU87dUJBbkJHLEtBQUs7S0FvQnZCOzs7OztJQWpCRCxJQUNJLFFBQVEsQ0FBQyxDQUEwQjtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM1QztLQUNEOzs7O0lBYUQsUUFBUTtRQUNQLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNaOzs7O0lBRUQsV0FBVztRQUNWLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNmOzs7OztJQUVELFdBQVcsQ0FBQyxZQUF5QztRQUNwRCxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEQsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNiLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNmO1lBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ1o7UUFDRCxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDZjtLQUNEOzs7O0lBRUQsU0FBUztRQUNSLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztZQUM1QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQjtTQUNEO0tBQ0Q7Ozs7SUFFTyxJQUFJO1FBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEYsT0FBTztTQUNQO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUd6RSxPQUFPLENBQUMsR0FBZTtRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7SUFHWixPQUFPO1FBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUI7Ozs7O0lBR00sV0FBVztRQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pEOzs7Ozs7SUFHTSxNQUFNLENBQUMsR0FBYztRQUM1QixJQUFJLEdBQUcsRUFBRTtZQUNSLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztZQUNmLE1BQU0sSUFBSSxxQkFBZSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDOztZQUM3QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2Y7Ozs7O0lBR00sT0FBTztRQUNkLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTs7WUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7WUFFbEQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQy9EO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Q7Ozs7OztJQUdNLFlBQVksQ0FBQyxPQUErQztRQUNuRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFrRCxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BILE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQWtELEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2pJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQWtELEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBRzVILFFBQVEsQ0FBQyxXQUFtQixFQUFFLEtBQW1DO1FBQ3hFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxLQUFLLEdBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDOztRQUMzRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFFbEQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLG9CQUFFLEtBQWUsRUFBQyxDQUFDO1NBQ25EO2FBQU07WUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckM7Ozs7WUEvSEYsU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSxVQUFVO2dCQUVwQixRQUFRLEVBQUUsMkJBQTJCO3lCQUQzQixrQ0FBa0M7YUFFNUM7Ozs7WUFiNEIsVUFBVTtZQUNpQixlQUFlO1lBQ3hDLFNBQVM7WUFJL0Isc0JBQXNCOzs7a0JBVTdCLEtBQUs7bUJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUdMLEtBQUs7Ozs7Ozs7QUNyQlA7OztZQU9DLFFBQVEsU0FBQztnQkFDVCxPQUFPLEVBQUk7b0JBQ1YsWUFBWTtpQkFDWjtnQkFDRCxZQUFZLEVBQUUsQ0FBRSxnQkFBZ0IsQ0FBRTtnQkFDbEMsU0FBUyxFQUFLLENBQUUsMEJBQTBCLENBQUU7Z0JBQzVDLE9BQU8sRUFBTyxDQUFFLGdCQUFnQixDQUFFO2FBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7In0=