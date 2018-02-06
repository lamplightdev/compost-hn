importScripts('/build/libs/workbox-v3.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/build/libs/workbox-v3.0.0-beta.0/'
});

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('https://node-hnapi.herokuapp.com/.*'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerNavigationRoute('/index.html');
