import {mergeApplicationConfig} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/component/app.component';
import {serverConfig} from './app/config/config.server';
import {configApp} from './app/config/config.app';

const config = mergeApplicationConfig(configApp, serverConfig);

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
