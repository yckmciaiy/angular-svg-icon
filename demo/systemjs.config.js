(function(global) {

	var ngVer = '@5.0.0';

	var paths = {
		'npm:' : 'https://unpkg.com/'
	}

	// map tells the System loader where to look for things
	var map = {
		'app':	'app',
		'angular-svg-icon': 'lib',
		'rxjs': 'npm:rxjs@5.5.2',
        'tslib': 'npm:tslib@1.7.1',
		'typescript' : 'npm:typescript@2.4.2/lib/typescript.js',

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
		'app':	{ main: 'main.ts', defaultExtension: 'ts' },
		'angular-svg-icon': { main: 'index.ts', defaultExtension: 'ts' },

		'rxjs': { defaultExtension: 'js' },
        'tslib': { main: 'tslib.js', defaultExtension: 'js' }
    };

	var config = {
		transpiler: 'typescript',
		typescriptOptions: {
			sourceMap: true,
			emitDecoratorMetadata: true,
			experimentalDecorators: true
		},
		meta: {
			typescript: { exports: 'ts' }
		},
		paths: paths,
		map: map,
		packages: packages
	}

	// filterSystemConfig - index.html's chance to modify config before it is registered.
	if (global.filterSystemConfig) {
		global.filterSystemConfig(config);
	}

	System.config(config);

})(this);
