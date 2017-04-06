(function (global) {

  var ngVer = '@4.0.0';

	var paths = {
		'npm:' : 'https://unpkg.com/'
	}

	var map = {
		'app'        : 'app',
		'rxjs'       : 'npm:rxjs@5.2.0',
		'typescript' : 'npm:typescript@2.1.4/lib/typescript.js'
	};

	var pkgs = [
		'common', 'compiler', 'core', 'forms', 'http', 'platform-browser', 'platform-browser-dynamic'
	];

	pkgs.forEach(function(name) {
		var key = '@angular/' + name;
		var value = 'npm:@angular/' + name + ngVer + '/bundles/' + name + '.umd.js';
		map[key] = value;
	});

	System.config({

		transpiler: 'typescript',
    	typescriptOptions: {
			"emitDecoratorMetadata": true
		},

	    paths: paths,
		map: map,

		packages: {
			app: {
        		main: './main.ts',
				defaultExtension: 'ts'
			},
			rxjs: {
				defaultExtension: 'js'
			}
		}
	});
})(this);

