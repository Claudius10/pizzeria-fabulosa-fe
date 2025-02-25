import {bootstrapApplication} from '@angular/platform-browser';
import {configApp} from './components/app/config/config.app';
import {AppComponent} from './components/app/component/app.component';

bootstrapApplication(AppComponent, configApp)
  .catch((err) => console.error(err));
