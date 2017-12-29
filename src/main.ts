// entry point, this file is responsible for instructing Angular's SystemJS tool exactly how to assemble our application when we launch it.
// It will load our root module, which then loads our root component.

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '../polyfills';
import { AppModule } from './components/app/app.module';
require("./index.css");

platformBrowserDynamic().bootstrapModule(AppModule);