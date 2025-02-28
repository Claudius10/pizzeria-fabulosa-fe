import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pizzas',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'beverages',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];

/*

# SSG - Render during build and serve static html - for pages whose contents are equal for a long time for all users and NO specific data is necessary (cookies, localstorage) to pre-render the html
https://angular.dev/guide/prerendering

# SSR - Server side rendering (render at runtime) - if contents change often and are dynamic and/or page requires specific data to render the html (request cookies)
https://angular.dev/guide/ssr

# Angular Hybrid Rendering - configurable rendering modes (the config in this file)
https://angular.dev/guide/hybrid-rendering

# CSR - Client side rendering - js on client device does everything

*/
