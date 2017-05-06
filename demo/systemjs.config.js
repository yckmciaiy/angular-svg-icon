(function(global) {

  var ngVer = '@4.0.0';

  var paths = {
    'npm:' : 'https://unpkg.com/'
  }

  // map tells the System loader where to look for things
  var map = {
    'app':  'app',
    'rxjs': 'npm:rxjs@5.2.0',
    '@angular': 'npm:@angular',
	'typescript' : 'npm:typescript@2.2.0/lib/typescript.js',
    'angular-svg-icon': 'lib'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':  { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs': { defaultExtension: 'js' },
    'angular-svg-icon': { main: 'index.ts', defaultExtension: 'ts' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
	'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic'
  ];

  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'npm:@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  });

  var config = {
	transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
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
