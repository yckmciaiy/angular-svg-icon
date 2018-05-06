(function(global) {

	// map tells the System loader where to look for things
	var map = {
		'app': 'runt/app',
		'angular-svg-icon': 'runt/lib',

		'rxjs': 'npm:rxjs',
		'rxjs/operators': 'npm:rxjs/operators',
		'tslib': 'npm:tslib',

		'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
		'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
		'@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
		'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
		'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js'
	};

	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app': {
			'main': 'main.js',
			'defaultExtension': 'js'
		},
		'angular-svg-icon': {
			'main': 'index.js',
			'defaultExtension': 'js'
		},
		'rxjs': {
			'main': 'index.js',
			'defaultExtension': 'js'
		},
		'rxjs/operators': {
			'main': 'index.js',
			'defaultExtension': 'js'
		},
		'tslib': {
			'main': 'tslib.js',
			'defaultExtension': 'js'
		}
	};

	var config = {
		paths: {
			'npm:': 'node_modules/'
		},
		map: map,
		packages: packages
	};

 	System.config(config);

})(this);
