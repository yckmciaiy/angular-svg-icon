/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of as observableOf, throwError as observableThrowError } from 'rxjs';
import { map, tap, catchError, finalize, share } from 'rxjs/operators';
var SvgIconRegistryService = /** @class */ (function () {
    function SvgIconRegistryService(http) {
        this.http = http;
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
            var svg = /** @type {?} */ (div.querySelector('svg'));
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
        if (name === void 0) { name = url; }
        if (this.iconsByUrl.has(name)) {
            return observableOf(this.iconsByUrl.get(name));
        }
        else if (this.iconsLoadingByUrl.has(name)) {
            return this.iconsLoadingByUrl.get(name);
        }
        /** @type {?} */
        var o = /** @type {?} */ (this.http.get(url, { responseType: 'text' }).pipe(map(function (svg) {
            /** @type {?} */
            var div = document.createElement('DIV');
            div.innerHTML = svg;
            return /** @type {?} */ (div.querySelector('svg'));
        }), tap(function (svg) { return _this.iconsByUrl.set(name, svg); }), catchError(function (err) {
            console.error(err);
            return observableThrowError(err);
        }), finalize(function () { return _this.iconsLoadingByUrl.delete(name); }), share()));
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
            return observableOf(this.iconsByUrl.get(name));
        }
        else if (this.iconsLoadingByUrl.has(name)) {
            return this.iconsLoadingByUrl.get(name);
        }
        return observableThrowError("No svg with name '" + name + "' has been loaded");
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
        { type: Injectable }
    ];
    /** @nocollapse */
    SvgIconRegistryService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return SvgIconRegistryService;
}());
export { SvgIconRegistryService };
if (false) {
    /** @type {?} */
    SvgIconRegistryService.prototype.iconsByUrl;
    /** @type {?} */
    SvgIconRegistryService.prototype.iconsLoadingByUrl;
    /** @type {?} */
    SvgIconRegistryService.prototype.http;
}
/**
 * @param {?} parentRegistry
 * @param {?} http
 * @return {?}
 */
export function SVG_ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, http) {
    return parentRegistry || new SvgIconRegistryService(http);
}
/** @type {?} */
export var SVG_ICON_REGISTRY_PROVIDER = {
    provide: SvgIconRegistryService,
    deps: [[new Optional(), new SkipSelf(), SvgIconRegistryService], HttpClient],
    useFactory: SVG_ICON_REGISTRY_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWljb24tcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3ZnLWljb24vIiwic291cmNlcyI6WyJzcmMvc3ZnLWljb24tcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBRSxVQUFVLElBQUksb0JBQW9CLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUYsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFRdEUsZ0NBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXOzBCQUhkLElBQUksR0FBRyxFQUFzQjtpQ0FDdEIsSUFBSSxHQUFHLEVBQWtDO0tBR3BFO0lBRUQsK0RBQStEOzs7Ozs7O0lBQy9ELHVDQUFNOzs7Ozs7SUFBTixVQUFPLElBQVcsRUFBRSxJQUFXO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNoQyxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOztZQUNyQixJQUFNLEdBQUcscUJBQWUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDL0I7S0FDRDtJQUVELDZDQUE2Qzs7Ozs7OztJ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QUUsSUFBZTtJQUN4RyxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDMUQ7O0FBRUQsV0FBYSwwQkFBMEIsR0FBRztJQUN6QyxPQUFPLEVBQUUsc0JBQXNCO0lBQy9CLElBQUksRUFBRSxDQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLHNCQUFzQixDQUFDLEVBQUUsVUFBVSxDQUFFO0lBQzlFLFVBQVUsRUFBRSxrQ0FBa0M7Q0FDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCB0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCwgY2F0Y2hFcnJvciwgZmluYWxpemUsIHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3ZnSWNvblJlZ2lzdHJ5U2VydmljZSB7XG5cblx0cHJpdmF0ZSBpY29uc0J5VXJsID0gbmV3IE1hcDxzdHJpbmcsIFNWR0VsZW1lbnQ+KCk7XG5cdHByaXZhdGUgaWNvbnNMb2FkaW5nQnlVcmwgPSBuZXcgTWFwPHN0cmluZywgT2JzZXJ2YWJsZTxTVkdFbGVtZW50Pj4oKTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCkge1xuXHR9XG5cblx0LyoqIEFkZCBhIFNWRyB0byB0aGUgcmVnaXN0cnkgYnkgcGFzc2luZyBhIG5hbWUgYW5kIHRoZSBTVkcuICovXG5cdGFkZFN2ZyhuYW1lOnN0cmluZywgZGF0YTpzdHJpbmcpIHtcblx0XHRpZiAoIXRoaXMuaWNvbnNCeVVybC5oYXMobmFtZSkpIHtcblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmlubmVySFRNTCA9IGRhdGE7XG5cdFx0XHRjb25zdCBzdmcgPSA8U1ZHRWxlbWVudD5kaXYucXVlcnlTZWxlY3Rvcignc3ZnJyk7XG5cdFx0XHR0aGlzLmljb25zQnlVcmwuc2V0KG5hbWUsIHN2Zyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqIExvYWQgYSBTVkcgdG8gdGhlIHJlZ2lzdHJ5IGZyb20gYSBVUkwuICovXG5cdGxvYWRTdmcodXJsOnN0cmluZywgbmFtZTogc3RyaW5nID0gdXJsKTogT2JzZXJ2YWJsZTxTVkdFbGVtZW50PiB7XG5cblx0XHRpZiAodGhpcy5pY29uc0J5VXJsLmhhcyhuYW1lKSkge1xuXHRcdFx0cmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmljb25zQnlVcmwuZ2V0KG5hbWUpKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuaGFzKG5hbWUpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pY29uc0xvYWRpbmdCeVVybC5nZXQobmFtZSk7XG5cdFx0fVxuXHRcdGNvbnN0IG8gPSA8T2JzZXJ2YWJsZTxTVkdFbGVtZW50Pj4gdGhpcy5odHRwLmdldCh1cmwsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSkucGlwZShcblx0XHRcdG1hcChzdmcgPT4ge1xuXHRcdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0XHRcdFx0ZGl2LmlubmVySFRNTCA9IHN2Zztcblx0XHRcdFx0cmV0dXJuIDxTVkdFbGVtZW50PmRpdi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRcdH0pLFxuXHRcdFx0dGFwIChzdmcgPT4gdGhpcy5pY29uc0J5VXJsLnNldChuYW1lLCBzdmcpICksXG5cdFx0XHRjYXRjaEVycm9yKGVyciA9PiB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0cmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKGVycik7XG5cdFx0XHR9KSxcblx0XHRcdGZpbmFsaXplKCgpID0+IHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuZGVsZXRlKG5hbWUpICksXG5cdFx0XHRzaGFyZSgpXG5cdFx0KTtcblxuXHRcdHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuc2V0KG5hbWUsIG8pO1xuXHRcdHJldHVybiBvO1xuXHR9XG5cblx0LyoqIEdldCBsb2FkZWQgU1ZHIGZyb20gcmVnaXN0cnkgYnkgbmFtZS4gKGFsc28gd29ya3MgYnkgdXJsIGJlY2F1c2Ugb2YgYmxlbmRlZCBtYXApICovXG5cdGdldFN2Z0J5TmFtZShuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+IHtcblx0XHRpZiAodGhpcy5pY29uc0J5VXJsLmhhcyhuYW1lKSkge1xuXHRcdFx0cmV0dXJuIG9ic2VydmFibGVPZih0aGlzLmljb25zQnlVcmwuZ2V0KG5hbWUpKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMuaWNvbnNMb2FkaW5nQnlVcmwuaGFzKG5hbWUpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pY29uc0xvYWRpbmdCeVVybC5nZXQobmFtZSk7XG5cdFx0fVxuXHRcdHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihgTm8gc3ZnIHdpdGggbmFtZSAnJHtuYW1lfScgaGFzIGJlZW4gbG9hZGVkYCk7XG5cdH1cblxuXHQvKiogUmVtb3ZlIGEgU1ZHIGZyb20gdGhlIHJlZ2lzdHJ5IGJ5IFVSTCAob3IgbmFtZSkuICovXG5cdHVubG9hZFN2Zyh1cmw6c3RyaW5nKSB7XG5cdFx0aWYgKHRoaXMuaWNvbnNCeVVybC5oYXModXJsKSkge1xuXHRcdFx0dGhpcy5pY29uc0J5VXJsLmRlbGV0ZSh1cmwpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVJfRkFDVE9SWShwYXJlbnRSZWdpc3RyeTpTdmdJY29uUmVnaXN0cnlTZXJ2aWNlLCBodHRwOkh0dHBDbGllbnQpIHtcblx0cmV0dXJuIHBhcmVudFJlZ2lzdHJ5IHx8IG5ldyBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlKGh0dHApO1xufVxuXG5leHBvcnQgY29uc3QgU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVIgPSB7XG5cdHByb3ZpZGU6IFN2Z0ljb25SZWdpc3RyeVNlcnZpY2UsXG5cdGRlcHM6IFsgW25ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKSwgU3ZnSWNvblJlZ2lzdHJ5U2VydmljZV0sIEh0dHBDbGllbnQgXSxcblx0dXNlRmFjdG9yeTogU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVJfRkFDVE9SWVxufTtcbiJdfQ==