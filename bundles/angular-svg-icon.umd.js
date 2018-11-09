(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-svg-icon', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['angular-svg-icon'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,http,rxjs,operators,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SvgIconRegistryService = (function () {
        function SvgIconRegistryService(http$$1) {
            this.http = http$$1;
            this.iconsByUrl = new Map();
            this.iconsLoadingByUrl = new Map();
        }
        /** Add a SVG to the registry by passing a name and the SVG. */
        /**
         * Add a SVG to the registry by passing a name and the SVG.
         * @param {?} name
         * @param {?} data
         * @return {?}
         */
        SvgIconRegistryService.prototype.addSvg = /**
         * Add a SVG to the registry by passing a name and the SVG.
         * @param {?} name
         * @param {?} data
         * @return {?}
         */
            function (name, data) {
                if (!this.iconsByUrl.has(name)) {
                    /** @type {?} */
                    var div = document.createElement('DIV');
                    div.innerHTML = data;
                    /** @type {?} */
                    var svg = (div.querySelector('svg'));
                    this.iconsByUrl.set(name, svg);
                }
            };
        /** Load a SVG to the registry from a URL. */
        /**
         * Load a SVG to the registry from a URL.
         * @param {?} url
         * @param {?=} name
         * @return {?}
         */
        SvgIconRegistryService.prototype.loadSvg = /**
         * Load a SVG to the registry from a URL.
         * @param {?} url
         * @param {?=} name
         * @return {?}
         */
            function (url, name) {
                var _this = this;
                if (name === void 0) {
                    name = url;
                }
                if (this.iconsByUrl.has(name)) {
                    return rxjs.of(this.iconsByUrl.get(name));
                }
                else if (this.iconsLoadingByUrl.has(name)) {
                    return this.iconsLoadingByUrl.get(name);
                }
                /** @type {?} */
                var o = (this.http.get(url, { responseType: 'text' }).pipe(operators.map(function (svg) {
                    /** @type {?} */
                    var div = document.createElement('DIV');
                    div.innerHTML = svg;
                    return /** @type {?} */ (div.querySelector('svg'));
                }), operators.tap(function (svg) { return _this.iconsByUrl.set(name, svg); }), operators.catchError(function (err) {
                    console.error(err);
                    return rxjs.throwError(err);
                }), operators.finalize(function () { return _this.iconsLoadingByUrl.delete(name); }), operators.share()));
                this.iconsLoadingByUrl.set(name, o);
                return o;
            };
        /** Get loaded SVG from registry by name. (also works by url because of blended map) */
        /**
         * Get loaded SVG from registry by name. (also works by url because of blended map)
         * @param {?} name
         * @return {?}
         */
        SvgIconRegistryService.prototype.getSvgByName = /**
         * Get loaded SVG from registry by name. (also works by url because of blended map)
         * @param {?} name
         * @return {?}
         */
            function (name) {
                if (this.iconsByUrl.has(name)) {
                    return rxjs.of(this.iconsByUrl.get(name));
                }
                else if (this.iconsLoadingByUrl.has(name)) {
                    return this.iconsLoadingByUrl.get(name);
                }
                return rxjs.throwError("No svg with name '" + name + "' has been loaded");
            };
        /** Remove a SVG from the registry by URL (or name). */
        /**
         * Remove a SVG from the registry by URL (or name).
         * @param {?} url
         * @return {?}
         */
        SvgIconRegistryService.prototype.unloadSvg = /**
         * Remove a SVG from the registry by URL (or name).
         * @param {?} url
         * @return {?}
         */
            function (url) {
                if (this.iconsByUrl.has(url)) {
                    this.iconsByUrl.delete(url);
                }
            };
        SvgIconRegistryService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SvgIconRegistryService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return SvgIconRegistryService;
    }());
    /**
     * @param {?} parentRegistry
     * @param {?} http
     * @return {?}
     */
    function SVG_ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, http$$1) {
        return parentRegistry || new SvgIconRegistryService(http$$1);
    }
    /** @type {?} */
    var SVG_ICON_REGISTRY_PROVIDER = {
        provide: SvgIconRegistryService,
        deps: [[new core.Optional(), new core.SkipSelf(), SvgIconRegistryService], http.HttpClient],
        useFactory: SVG_ICON_REGISTRY_PROVIDER_FACTORY
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var SvgIconComponent = (function () {
        function SvgIconComponent(element, differs, renderer, iconReg) {
            this.element = element;
            this.differs = differs;
            this.renderer = renderer;
            this.iconReg = iconReg;
            this.stretch = false;
        }
        Object.defineProperty(SvgIconComponent.prototype, "svgStyle", {
            // Adapted from ngStyle
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                this._svgStyle = v;
                if (!this.differ && v) {
                    this.differ = this.differs.find(v).create();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SvgIconComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.init();
            };
        /**
         * @return {?}
         */
        SvgIconComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.destroy();
            };
        /**
         * @param {?} changeRecord
         * @return {?}
         */
        SvgIconComponent.prototype.ngOnChanges = /**
         * @param {?} changeRecord
         * @return {?}
         */
            function (changeRecord) {
                if (changeRecord['src'] || changeRecord['name']) {
                    if (this.svg) {
                        this.destroy();
                    }
                    this.init();
                }
                if (changeRecord['stretch']) {
                    this.stylize();
                }
            };
        /**
         * @return {?}
         */
        SvgIconComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
            function () {
                if (this.svg && this.differ) {
                    /** @type {?} */
                    var changes = this.differ.diff(this._svgStyle);
                    if (changes) {
                        this.applyChanges(changes);
                    }
                }
            };
        /**
         * @return {?}
         */
        SvgIconComponent.prototype.init = /**
         * @return {?}
         */
            function () {
                if (this.name) {
                    this.icnSub = this.iconReg.getSvgByName(this.name).subscribe(this.initSvg.bind(this));
                    return;
                }
                this.icnSub = this.iconReg.loadSvg(this.src).subscribe(this.initSvg.bind(this));
            };
        /**
         * @param {?} svg
         * @return {?}
         */
        SvgIconComponent.prototype.initSvg = /**
         * @param {?} svg
         * @return {?}
         */
            function (svg) {
                this.setSvg(svg);
                this.resetDiffer();
            };
        /**
         * @return {?}
         */
        SvgIconComponent.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.svg = undefined;
                this.differ = undefined;
                if (this.icnSub) {
                    this.icnSub.unsubscribe();
                }
            };
        /**
         * @return {?}
         */
        SvgIconComponent.prototype.resetDiffer = /**
         * @return {?}
         */
            function () {
                if (this._svgStyle && !this.differ) {
                    this.differ = this.differs.find(this._svgStyle).create();
                }
            };
        /**
         * @param {?} svg
         * @return {?}
         */
        SvgIconComponent.prototype.setSvg = /**
         * @param {?} svg
         * @return {?}
         */
            function (svg) {
                if (svg) {
                    this.svg = svg;
                    /** @type {?} */
                    var icon = (svg.cloneNode(true));
                    /** @type {?} */
                    var elem = this.element.nativeElement;
                    elem.innerHTML = '';
                    this.renderer.appendChild(elem, icon);
                    this.stylize();
                }
            };
        /**
         * @return {?}
         */
        SvgIconComponent.prototype.stylize = /**
         * @return {?}
         */
            function () {
                if (this.svg) {
                    /** @type {?} */
                    var svg = this.element.nativeElement.firstChild;
                    if (this.stretch === true) {
                        this.renderer.setAttribute(svg, 'preserveAspectRatio', 'none');
                    }
                    else if (this.stretch === false) {
                        this.renderer.removeAttribute(svg, 'preserveAspectRatio');
                    }
                }
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        SvgIconComponent.prototype.applyChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                var _this = this;
                changes.forEachRemovedItem(function (record) { return _this.setStyle(record.key, null); });
                changes.forEachAddedItem(function (record) { return _this.setStyle(record.key, record.currentValue); });
                changes.forEachChangedItem(function (record) { return _this.setStyle(record.key, record.currentValue); });
            };
        /**
         * @param {?} nameAndUnit
         * @param {?} value
         * @return {?}
         */
        SvgIconComponent.prototype.setStyle = /**
         * @param {?} nameAndUnit
         * @param {?} value
         * @return {?}
         */
            function (nameAndUnit, value) {
                var _a = __read(nameAndUnit.split('.'), 2), name = _a[0], unit = _a[1];
                value = value !== null && unit ? "" + value + unit : value;
                /** @type {?} */
                var svg = this.element.nativeElement.firstChild;
                if (value !== null) {
                    this.renderer.setStyle(svg, name, /** @type {?} */ (value));
                }
                else {
                    this.renderer.removeStyle(svg, name);
                }
            };
        SvgIconComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'svg-icon',
                        template: '<ng-content></ng-content>',
                        styles: [":host { display: inline-block; }"]
                    }] }
        ];
        /** @nocollapse */
        SvgIconComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.KeyValueDiffers },
                { type: core.Renderer2 },
                { type: SvgIconRegistryService }
            ];
        };
        SvgIconComponent.propDecorators = {
            src: [{ type: core.Input }],
            name: [{ type: core.Input }],
            stretch: [{ type: core.Input }],
            svgStyle: [{ type: core.Input }]
        };
        return SvgIconComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularSvgIconModule = (function () {
        function AngularSvgIconModule() {
        }
        AngularSvgIconModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                        ],
                        declarations: [SvgIconComponent],
                        providers: [SVG_ICON_REGISTRY_PROVIDER],
                        exports: [SvgIconComponent]
                    },] }
        ];
        return AngularSvgIconModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AngularSvgIconModule = AngularSvgIconModule;
    exports.SvgIconRegistryService = SvgIconRegistryService;
    exports.SVG_ICON_REGISTRY_PROVIDER_FACTORY = SVG_ICON_REGISTRY_PROVIDER_FACTORY;
    exports.SVG_ICON_REGISTRY_PROVIDER = SVG_ICON_REGISTRY_PROVIDER;
    exports.SvgIconComponent = SvgIconComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zdmctaWNvbi51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItc3ZnLWljb24vc3JjL3N2Zy1pY29uLXJlZ2lzdHJ5LnNlcnZpY2UudHMiLCJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9hbmd1bGFyLXN2Zy1pY29uL3NyYy9zdmctaWNvbi5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItc3ZnLWljb24vc3JjL2FuZ3VsYXItc3ZnLWljb24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCB0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCwgY2F0Y2hFcnJvciwgZmluYWxpemUsIHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3ZnSWNvblJlZ2lzdHJ5U2VydmljZSB7XG5cblx0cHJpdmF0ZSBpY29uc0J5VXJsID0gbmV3IE1hcDxzdHJpbmcsIFNWR0VsZW1lbnQ+KCk7XG5cdHByaXZhdGUgaWNvbnNMb2FkaW5nQnlVcmwgPSBuZXcgTWFwPHN0cmluZywgT2JzZXJ2YWJsZTxTVkdFbGVtZW50Pj4oKTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCkge1xuXHR9XG5cblx0LyoqIEFkZCBhIFNWRyB0byB0aGUgcmVnaXN0cnkgYnkgcGFzc2luZyBhIG5hbWUgYW5kIHRoZSBTVkcuICovXG5cdGFkZFN2ZyhuYW1lOnN0cmluZywgZGF0YTpzdHJpbmcpIHtcblx0XHRpZiAoIXRoaXMuaWNvbnNCeVVybC5oYXMobmFtZSkpIHtcblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmlubmVySFRNTCA9IGRhdGE7XG5cdFx0XHRjb25zdCBzdmcgPSA8U1ZHRWxlbWVudD5kaXYucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0XHR0aGlzLmljb25zQnlVcmwuc2V0KG5hbWUsIHN2Zyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqIExvYWQgYSBTVkcgdG8gdGhlIHJlZ2lzdHJ5IGZyb20gYSBVUkwuICovXG5cdGxvYWRTdmcodXJsOnN0cmluZywgbmFtZTogc3RyaW5nID0gdXJsKTogT2JzZXJ2YWJsZTxTVkdFbGVtZW50PiB7XG5cblx0XHRpZiAodGhpcy5pY29uc0J5VXJsLmhhcyhuYW1lKSkge1xuXHRcdFx0cmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmljb25zQnlVcmwuZ2V0KG5hbWUpKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuaGFzKG5hbWUpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pY29uc0xvYWRpbmdCeVVybC5nZXQobmFtZSk7XG5cdFx0fVxuXHRcdGNvbnN0IG8gPSA8T2JzZXJ2YWJsZTxTVkdFbGVtZW50Pj4gdGhpcy5odHRwLmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSkucGlwZShcblx0XHRcdG1hcChzdmcgPT4ge1xuXHRcdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0XHRcdFx0ZGl2LmlubmVySFRNTCA9IHN2Zztcblx0XHRcdFx0cmV0dXJuIDxTVkdFbGVtZW50PmRpdi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRcdH0pLFxuXHRcdFx0dGFwIChzdmcgPT4gdGhpcy5pY29uc0J5VXJsLnNldChuYW1lLCBzdmcpICksXG5cdFx0XHRjYXRjaEVycm9yKGVyciA9PiB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0cmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKGVycik7XG5cdFx0XHR9KSxcblx0XHRcdGZpbmFsaXplKCgpID0+IHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuZGVsZXRlKG5hbWUpICksXG5cdFx0XHRzaGFyZSgpXG5cdFx0KTtcblxuXHRcdHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuc2V0KG5hbWUsIG8pO1xuXHRcdHJldHVybiBvO1xuXHR9XG5cblx0LyoqIEdldCBsb2FkZWQgU1ZHIGZyb20gcmVnaXN0cnkgYnkgbmFtZS4gKGFsc28gd29ya3MgYnkgdXJsIGJlY2F1c2Ugb2YgYmxlbmRlZCBtYXApICovXG5cdGdldFN2Z0J5TmFtZShuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+IHtcblx0XHRpZiAodGhpcy5pY29uc0J5VXJsLmhhcyhuYW1lKSkge1xuXHRcdFx0cmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmljb25zQnlVcmwuZ2V0KG5hbWUpKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuaGFzKG5hbWUpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pY29uc0xvYWRpbmdCeVVybC5nZXQobmFtZSk7XG5cdFx0fVxuXHRcdHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihgTm8gc3ZnIHdpdGggbmFtZSAnJHtuYW1lfScgaGFzIGJlZW4gbG9hZGVkYCk7XG5cdH1cblxuXHQvKiogUmVtb3ZlIGEgU1ZHIGZyb20gdGhlIHJlZ2lzdHJ5IGJ5IFVSTCAob3IgbmFtZSkuICovXG5cdHVubG9hZFN2Zyh1cmw6c3RyaW5nKSB7XG5cdFx0aWYgKHRoaXMuaWNvbnNCeVVybC5oYXModXJsKSkge1xuXHRcdFx0dGhpcy5pY29uc0J5VXJsLmRlbGV0ZSh1cmwpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVJfRkFDVE9SWShwYXJlbnRSZWdpc3RyeTpTdmdJY29uUmVnaXN0cnlTZXJ2aWNlLCBodHRwOkh0dHBDbGllbnQpIHtcblx0cmV0dXJuIHBhcmVudFJlZ2lzdHJ5IHx8IG5ldyBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlKGh0dHApO1xufVxuXG5leHBvcnQgY29uc3QgU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVIgPSB7XG5cdHByb3ZpZGU6IFN2Z0ljb25SZWdpc3RyeVNlcnZpY2UsXG5cdGRlcHM6IFsgW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgU3ZnSWNvblJlZ2lzdHJ5U2VydmljZV0sIEh0dHBDbGllbnQgXSxcblx0dXNlRmFjdG9yeTogU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVJfRkFDVE9SWVxufTtcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBEb0NoZWNrLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsXG5cdEtleVZhbHVlQ2hhbmdlUmVjb3JkLCBLZXlWYWx1ZUNoYW5nZXMsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsXG5cdE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi9zdmctaWNvbi1yZWdpc3RyeS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdzdmctaWNvbicsXG5cdHN0eWxlczogWyBgOmhvc3QgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1gIF0sXG5cdHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5cbmV4cG9ydCBjbGFzcyBTdmdJY29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgRG9DaGVjayB7XG5cdEBJbnB1dCgpIHNyYzpzdHJpbmc7XG5cdEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuXHRASW5wdXQoKSBzdHJldGNoID0gZmFsc2U7XG5cblx0Ly8gQWRhcHRlZCBmcm9tIG5nU3R5bGVcblx0QElucHV0KClcblx0c2V0IHN2Z1N0eWxlKHY6IHtba2V5OnN0cmluZ106IHN0cmluZyB9KSB7XG5cdFx0dGhpcy5fc3ZnU3R5bGUgPSB2O1xuXHRcdGlmICghdGhpcy5kaWZmZXIgJiYgdikge1xuXHRcdFx0dGhpcy5kaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2KS5jcmVhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHN2ZzpTVkdFbGVtZW50O1xuXHRwcml2YXRlIGljblN1YjpTdWJzY3JpcHRpb247XG5cdHByaXZhdGUgZGlmZmVyOktleVZhbHVlRGlmZmVyPHN0cmluZywgc3RyaW5nfG51bWJlcj47XG5cdHByaXZhdGUgX3N2Z1N0eWxlOiB7W2tleTpzdHJpbmddOnN0cmluZ307XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OkVsZW1lbnRSZWYsXG5cdFx0cHJpdmF0ZSBkaWZmZXJzOktleVZhbHVlRGlmZmVycyxcblx0XHRwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyMixcblx0XHRwcml2YXRlIGljb25SZWc6U3ZnSWNvblJlZ2lzdHJ5U2VydmljZSkge1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLmRlc3Ryb3koKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZVJlY29yZDoge1trZXk6c3RyaW5nXTpTaW1wbGVDaGFuZ2V9KSB7XG5cdFx0aWYgKGNoYW5nZVJlY29yZFsnc3JjJ10gfHwgY2hhbmdlUmVjb3JkWyduYW1lJ10pIHtcblx0XHRcdGlmICh0aGlzLnN2Zykge1xuXHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0XHRpZiAoY2hhbmdlUmVjb3JkWydzdHJldGNoJ10pIHtcblx0XHRcdHRoaXMuc3R5bGl6ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nRG9DaGVjaygpIHtcblx0XHRpZiAodGhpcy5zdmcgJiYgdGhpcy5kaWZmZXIpIHtcblx0XHRcdGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMuX3N2Z1N0eWxlKTtcblx0XHRcdGlmIChjaGFuZ2VzKSB7XG5cdFx0XHRcdHRoaXMuYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgaW5pdCgpIHtcblx0XHRpZiAodGhpcy5uYW1lKSB7XG5cdFx0XHR0aGlzLmljblN1YiA9IHRoaXMuaWNvblJlZy5nZXRTdmdCeU5hbWUodGhpcy5uYW1lKS5zdWJzY3JpYmUodGhpcy5pbml0U3ZnLmJpbmQodGhpcykpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmljblN1YiA9IHRoaXMuaWNvblJlZy5sb2FkU3ZnKHRoaXMuc3JjKS5zdWJzY3JpYmUodGhpcy5pbml0U3ZnLmJpbmQodGhpcykpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbml0U3ZnKHN2ZzogU1ZHRWxlbWVudCk6IHZvaWQge1xuXHRcdHRoaXMuc2V0U3ZnKHN2Zyk7XG5cdFx0dGhpcy5yZXNldERpZmZlcigpO1xuXHR9XG5cblx0cHJpdmF0ZSBkZXN0cm95KCkge1xuXHRcdHRoaXMuc3ZnID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZGlmZmVyID0gdW5kZWZpbmVkO1xuXHRcdGlmICh0aGlzLmljblN1Yikge1xuXHRcdFx0dGhpcy5pY25TdWIudW5zdWJzY3JpYmUoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJlc2V0RGlmZmVyKCkge1xuXHRcdGlmICh0aGlzLl9zdmdTdHlsZSAmJiAhdGhpcy5kaWZmZXIpIHtcblx0XHRcdHRoaXMuZGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5fc3ZnU3R5bGUpLmNyZWF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc2V0U3ZnKHN2ZzpTVkdFbGVtZW50KSB7XG5cdFx0aWYgKHN2Zykge1xuXHRcdFx0dGhpcy5zdmcgPSBzdmc7XG5cdFx0XHRjb25zdCBpY29uID0gPFNWR0VsZW1lbnQ+c3ZnLmNsb25lTm9kZSh0cnVlKTtcblx0XHRcdGNvbnN0IGVsZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdFx0ZWxlbS5pbm5lckhUTUwgPSAnJztcblx0XHRcdHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZWxlbSwgaWNvbik7XG5cblx0XHRcdHRoaXMuc3R5bGl6ZSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc3R5bGl6ZSgpIHtcblx0XHRpZiAodGhpcy5zdmcpIHtcblx0XHRcdGNvbnN0IHN2ZyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRcdGlmICh0aGlzLnN0cmV0Y2ggPT09IHRydWUpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAncHJlc2VydmVBc3BlY3RSYXRpbycsICdub25lJyk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RyZXRjaCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUoc3ZnLCAncHJlc2VydmVBc3BlY3RSYXRpbycpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXBwbHlDaGFuZ2VzKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIHN0cmluZ3xudW1iZXI+KSB7XG5cdFx0Y2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZDpLZXlWYWx1ZUNoYW5nZVJlY29yZDxzdHJpbmcsIHN0cmluZ3xudW1iZXI+KSA9PiB0aGlzLnNldFN0eWxlKHJlY29yZC5rZXksIG51bGwpKTtcblx0XHRjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oKHJlY29yZDpLZXlWYWx1ZUNoYW5nZVJlY29yZDxzdHJpbmcsIHN0cmluZ3xudW1iZXI+KSA9PiB0aGlzLnNldFN0eWxlKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpKTtcblx0XHRjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbSgocmVjb3JkOktleVZhbHVlQ2hhbmdlUmVjb3JkPHN0cmluZywgc3RyaW5nfG51bWJlcj4pID0+IHRoaXMuc2V0U3R5bGUocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSkpO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXRTdHlsZShuYW1lQW5kVW5pdDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfG51bWJlcnxudWxsfHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IFtuYW1lLCB1bml0XSA9IG5hbWVBbmRVbml0LnNwbGl0KCcuJyk7XG5cdFx0dmFsdWUgPSB2YWx1ZSAhPT0gbnVsbCAmJiB1bml0ID8gYCR7dmFsdWV9JHt1bml0fWAgOiB2YWx1ZTtcblx0XHRjb25zdCBzdmcgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5maXJzdENoaWxkO1xuXG5cdFx0aWYgKHZhbHVlICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHN2ZywgbmFtZSwgdmFsdWUgYXMgc3RyaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShzdmcsIG5hbWUpO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuaW1wb3J0IHsgU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVIgfSBmcm9tICcuL3N2Zy1pY29uLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ZnSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vc3ZnLWljb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czpcdCAgW1xuXHRcdENvbW1vbk1vZHVsZSxcblx0XSxcblx0ZGVjbGFyYXRpb25zOiBbIFN2Z0ljb25Db21wb25lbnQgXSxcblx0cHJvdmlkZXJzOiAgICBbIFNWR19JQ09OX1JFR0lTVFJZX1BST1ZJREVSIF0sXG5cdGV4cG9ydHM6ICAgICAgWyBTdmdJY29uQ29tcG9uZW50IF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBBbmd1bGFyU3ZnSWNvbk1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbImh0dHAiLCJvYnNlcnZhYmxlT2YiLCJtYXAiLCJ0YXAiLCJjYXRjaEVycm9yIiwib2JzZXJ2YWJsZVRocm93RXJyb3IiLCJmaW5hbGl6ZSIsInNoYXJlIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJPcHRpb25hbCIsIlNraXBTZWxmIiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIktleVZhbHVlRGlmZmVycyIsIlJlbmRlcmVyMiIsIklucHV0IiwiTmdNb2R1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