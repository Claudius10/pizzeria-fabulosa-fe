// app.routes.server.ts
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pizzas', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'beverages', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  // {
  //   path: '', // This page requires user-specific data, so we use SSR
  //   renderMode: RenderMode.Server,
  // },
  {
    path: '**', // All other routes will be rendered on the client (CSR)
    renderMode: RenderMode.Client,
  },
];

/*

# SSG - Prerendering (Render during build)
https://angular.dev/guide/prerendering

# SSR - Server side rendering
https://angular.dev/guide/ssr

# Angular Hybrid Rendering
https://angular.dev/guide/hybrid-rendering

# CSR - Client side rendering

*/
