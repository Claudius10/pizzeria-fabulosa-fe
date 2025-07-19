import {bootstrapApplication} from '@angular/platform-browser';
import {configApp} from './app/config/config.app';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, configApp)
  .catch((err) => console.error(err));
