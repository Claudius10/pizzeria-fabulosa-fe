import {mergeApplicationConfig} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './components/app/component/app.component';
import {serverConfig} from './components/app/config/config.server';
import {configApp} from './components/app/config/config.app';

const config = mergeApplicationConfig(configApp, serverConfig);

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
