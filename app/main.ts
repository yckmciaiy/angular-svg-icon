import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/add/operator/map';

import { DemoAppComponent } from './demo-app.component';

bootstrap(DemoAppComponent, [ HTTP_PROVIDERS ]);
