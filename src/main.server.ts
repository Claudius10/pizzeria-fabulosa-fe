import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './components/app/component/app.component';
import {config} from './components/app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
