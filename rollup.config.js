export default {
	format: 'umd',
	moduleName: 'angular-svg-icon',
	external: [
		'@angular/common',
		'@angular/core',
		'@angular/http',
        'rxjs/add/observable/of',
        'rxjs/add/operator/do',
        'rxjs/add/operator/finally',
        'rxjs/add/operator/map',
        'rxjs/add/operator/share',
        'rxjs/Observable'
	],
    globals: {
        '@angular/common': 'ng.common',
        '@angular/core': 'ng.core',
        '@angular/http': 'ng.http',
		'rxjs/add/observable/of' : 'Rx.Observable',
		'rxjs/add/operator/do' : 'Rx.Observable.prototype',
		'rxjs/add/operator/finally' : 'Rx.Observable.prototype',
		'rxjs/add/operator/map' : 'Rx.Observable.prototype',
		'rxjs/add/operator/share' : 'Rx.Observable.prototype',
		'rxjs/Observable' : 'Rx'
    },
	onwarn: ( warning ) => {
		const skip_codes = [
			'THIS_IS_UNDEFINED',
			'MISSING_GLOBAL_NAME'
		];
		if ( skip_codes.indexOf(warning.code) != -1 )
			return;
		console.error(warning);
	}
};

