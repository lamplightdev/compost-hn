# compost-hn

> A [Hacker News PWA](https://hnpwa.com/) implementation using native Web Components and [compost](https://github.com/lamplightdev/compost) - a small collection of web component mixins.

Uses the unofficial HackerNews API [node-hnapi](https://github.com/cheeaun/node-hnapi), and works on all modern browsers.

See [https://compost-35844.firebaseapp.com/top/](https://compost-35844.firebaseapp.com/top/) for a live production build.

## Build

### Development

Ideal for testing out the implementation.

`npm install`

`npm run build:dev`

This copies the required files from `node_modules` into the `public` directory, bundles the js with sourcemaps (using [rollup](https://rollupjs.org)), and creates a service worker.


### Production

Currently geared towards firebase hosting.

`npm install`

`npm run build:prod`

`firebase deploy`

This does the same as the dev build but creates a separate `build` directory for deploying, creates a firebase function to preload and cache API results for the root page, and sets cache control for static assets.

