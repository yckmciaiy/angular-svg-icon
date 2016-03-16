import {bootstrap}    from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';


import {DemoAppComponent} from './demo-app.component'

bootstrap(DemoAppComponent, [ HTTP_PROVIDERS ]);
