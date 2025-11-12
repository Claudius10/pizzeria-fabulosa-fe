import {mergeApplicationConfig} from '@angular/core';
import {bootstrapApplication, BootstrapContext} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {serverConfig} from './app/config/config.server';
import {configApp} from './app/config/config.app';

const config = mergeApplicationConfig(configApp, serverConfig);

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
