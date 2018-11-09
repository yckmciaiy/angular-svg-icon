/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of as observableOf, throwError as observableThrowError } from 'rxjs';
import { map, tap, catchError, finalize, share } from 'rxjs/operators';
export class SvgIconRegistryService {
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
            return observableOf(this.iconsByUrl.get(name));
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
            return observableThrowError(err);
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
            return observableOf(this.iconsByUrl.get(name));
        }
        else if (this.iconsLoadingByUrl.has(name)) {
            return this.iconsLoadingByUrl.get(name);
        }
        return observableThrowError(`No svg with name '${name}' has been loaded`);
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
export const SVG_ICON_REGISTRY_PROVIDER = {
    provide: SvgIconRegistryService,
    deps: [[new Optional(), new SkipSelf(), SvgIconRegistryService], HttpClient],
    useFactory: SVG_ICON_REGISTRY_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWljb24tcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3ZnLWljb24vIiwic291cmNlcyI6WyJzcmMvc3ZnLWljb24tcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBRSxVQUFVLElBQUksb0JBQW9CLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUYsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2RSxNQUFNOzs7O0lBS0wsWUFBb0IsSUFBZTtRQUFmLFNBQUksR0FBSixJQUFJLENBQVc7MEJBSGQsSUFBSSxHQUFHLEVBQXNCO2lDQUN0QixJQUFJLEdBQUcsRUFBa0M7S0FHcEU7Ozs7Ozs7SUFHRCxNQUFNLENBQUMsSUFBVyxFQUFFLElBQVc7UUFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ2hDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7O1lBQ3JCLE1BQU0sR0FBRyxxQkFBZSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMvQjtLQUNEOzs7Ozs7O0lBR0QsT0FBTyxDQUFDLEdBQVUsRUFBRSxP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QUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsc0JBQXNCLENBQUMsRUFBRSxVQUFVLENBQUU7SUFDOUUsVUFBVSxFQUFFLGtDQUFrQztDQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIHRocm93RXJyb3IgYXMgb2JzZXJ2YWJsZVRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwLCBjYXRjaEVycm9yLCBmaW5hbGl6ZSwgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlIHtcblxuXHRwcml2YXRlIGljb25zQnlVcmwgPSBuZXcgTWFwPHN0cmluZywgU1ZHRWxlbWVudD4oKTtcblx0cHJpdmF0ZSBpY29uc0xvYWRpbmdCeVVybCA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+PigpO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDpIdHRwQ2xpZW50KSB7XG5cdH1cblxuXHQvKiogQWRkIGEgU1ZHIHRvIHRoZSByZWdpc3RyeSBieSBwYXNzaW5nIGEgbmFtZSBhbmQgdGhlIFNWRy4gKi9cblx0YWRkU3ZnKG5hbWU6c3RyaW5nLCBkYXRhOnN0cmluZykge1xuXHRcdGlmICghdGhpcy5pY29uc0J5VXJsLmhhcyhuYW1lKSkge1xuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gZGF0YTtcblx0XHRcdGNvbnN0IHN2ZyA9IDxTVkdFbGVtZW50PmRpdi5xdWVyeVNlbGVjdG9yKCdzdmcnKTtcblx0XHRcdHRoaXMuaWNvbnNCeVVybC5zZXQobmFtZSwgc3ZnKTtcblx0XHR9XG5cdH1cblxuXHQvKiogTG9hZCBhIFNWRyB0byB0aGUgcmVnaXN0cnkgZnJvbSBhIFVSTC4gKi9cblx0bG9hZFN2Zyh1cmw6c3RyaW5nLCBuYW1lOiBzdHJpbmcgPSB1cmwpOiBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+IHtcblxuXHRcdGlmICh0aGlzLmljb25zQnlVcmwuaGFzKG5hbWUpKSB7XG5cdFx0XHRyZXR1cm4gb2JzZXJ2YWJsZU9mKHRoaXMuaWNvbnNCeVVybC5nZXQobmFtZSkpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5pY29uc0xvYWRpbmdCeVVybC5oYXMobmFtZSkpIHtcblx0XHRcdHJldHVybiB0aGlzLmljb25zTG9hZGluZ0J5VXJsLmdldChuYW1lKTtcblx0XHR9XG5cdFx0Y29uc3QgbyA9IDxPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+PiB0aGlzLmh0dHAuZ2V0KHVybCwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS5waXBlKFxuXHRcdFx0bWFwKHN2ZyA9PiB7XG5cdFx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0XHRkaXYuaW5uZXJIVE1MID0gc3ZnO1xuXHRcdFx0XHRyZXR1cm4gPFNWR0VsZW1lbnQ+ZGl2LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXHRcdFx0fSksXG5cdFx0XHR0YXAgKHN2ZyA9PiB0aGlzLmljb25zQnlVcmwuc2V0KG5hbWUsIHN2ZykgKSxcblx0XHRcdGNhdGNoRXJyb3IoZXJyID0+IHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRyZXR1cm4gb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJyKTtcblx0XHRcdH0pLFxuXHRcdFx0ZmluYWxpemUoKCkgPT4gdGhpcy5pY29uc0xvYWRpbmdCeVVybC5kZWxldGUobmFtZSkgKSxcblx0XHRcdHNoYXJlKClcblx0XHQpO1xuXG5cdFx0dGhpcy5pY29uc0xvYWRpbmdCeVVybC5zZXQobmFtZSwgbyk7XG5cdFx0cmV0dXJuIG87XG5cdH1cblxuXHQvKiogR2V0IGxvYWRlZCBTVkcgZnJvbSByZWdpc3RyeSBieSBuYW1lLiAoYWxzbyB3b3JrcyBieSB1cmwgYmVjYXVzZSBvZiBibGVuZGVkIG1hcCkgKi9cblx0Z2V0U3ZnQnlOYW1lKG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD4ge1xuXHRcdGlmICh0aGlzLmljb25zQnlVcmwuaGFzKG5hbWUpKSB7XG5cdFx0XHRyZXR1cm4gb2JzZXJ2YWJsZU9mKHRoaXMuaWNvbnNCeVVybC5nZXQobmFtZSkpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5pY29uc0xvYWRpbmdCeVVybC5oYXMobmFtZSkpIHtcblx0XHRcdHJldHVybiB0aGlzLmljb25zTG9hZGluZ0J5VXJsLmdldChuYW1lKTtcblx0XHR9XG5cdFx0cmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKGBObyBzdmcgd2l0aCBuYW1lICcke25hbWV9JyBoYXMgYmVlbiBsb2FkZWRgKTtcblx0fVxuXG5cdC8qKiBSZW1vdmUgYSBTVkcgZnJvbSB0aGUgcmVnaXN0cnkgYnkgVVJMIChvciBuYW1lKS4gKi9cblx0dW5sb2FkU3ZnKHVybDpzdHJpbmcpIHtcblx0XHRpZiAodGhpcy5pY29uc0J5VXJsLmhhcyh1cmwpKSB7XG5cdFx0XHR0aGlzLmljb25zQnlVcmwuZGVsZXRlKHVybCk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTVkdfSUNPTl9SRUdJU1RSWV9QUk9WSURFUl9GQUNUT1JZKHBhcmVudFJlZ2lzdHJ5OlN2Z0ljb25SZWdpc3RyeVNlcnZpY2UsIGh0dHA6SHR0cENsaWVudCkge1xuXHRyZXR1cm4gcGFyZW50UmVnaXN0cnkgfHwgbmV3IFN2Z0ljb25SZWdpc3RyeVNlcnZpY2UoaHR0cCk7XG59XG5cbmV4cG9ydCBjb25zdCBTVkdfSUNPTl9SRUdJU1RSWV9QUk9WSURFUiA9IHtcblx0cHJvdmlkZTogU3ZnSWNvblJlZ2lzdHJ5U2VydmljZSxcblx0ZGVwczogWyBbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBTdmdJY29uUmVnaXN0cnlTZXJ2aWNlXSwgSHR0cENsaWVudCBdLFxuXHR1c2VGYWN0b3J5OiBTVkdfSUNPTl9SRUdJU1RSWV9QUk9WSURFUl9GQUNUT1JZXG59O1xuIl19