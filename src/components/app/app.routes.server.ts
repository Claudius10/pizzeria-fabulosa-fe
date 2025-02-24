// app.routes.server.ts
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: 'home', // This page is static, so we prerender it (SSG)
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
    {
        path: '**', // All other routes will be rendered on the client (CSR)
        renderMode: RenderMode.Client,
    },
];

/*

# SSG - Prerendering (Render during build) - for pages that are static, contents are equal for all users
https://angular.dev/guide/prerendering

# SSR - Server side rendering - if page requires user-specific data
https://angular.dev/guide/ssr

# Angular Hybrid Rendering
https://angular.dev/guide/hybrid-rendering

# CSR - Client side rendering

*/
