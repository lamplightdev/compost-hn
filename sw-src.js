importScripts('/build/libs/workbox-v3.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/build/libs/workbox-v3.0.0-beta.0/'
});

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerNavigationRoute('/index.html');
