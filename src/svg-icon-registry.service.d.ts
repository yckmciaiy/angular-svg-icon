import { Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class SvgIconRegistryService {
    private http;
    private iconsByUrl;
    private iconsLoadingByUrl;
    constructor(http: HttpClient);
    /** Add a SVG to the registry by passing a name and the SVG. */
    addSvg(name: string, data: string): void;
    /** Load a SVG to the registry from a URL. */
    loadSvg(url: string, name?: string): Observable<SVGElement>;
    /** Get loaded SVG from registry by name. (also works by url because of blended map) */
    getSvgByName(name: string): Observable<SVGElement>;
    /** Remove a SVG from the registry by URL (or name). */
    unloadSvg(url: string): void;
}
export declare function SVG_ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry: SvgIconRegistryService, http: HttpClient): SvgIconRegistryService;
export declare const SVG_ICON_REGISTRY_PROVIDER: {
    provide: typeof SvgIconRegistryService;
    deps: (Optional[] | typeof HttpClient)[];
    useFactory: typeof SVG_ICON_REGISTRY_PROVIDER_FACTORY;
};
