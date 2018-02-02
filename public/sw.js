importScripts('/build/libs/workbox-v3.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/build/libs/workbox-v3.0.0-beta.0/'
});

workbox.precaching.precacheAndRoute([
  {
    "url": "build/app.js",
    "revision": "1ac3b99b3294f0c6d49bc8731628ab19"
  },
  {
    "url": "build/libs/webcomponentsjs/custom-elements-es5-adapter.js",
    "revision": "a5043c1d0dd16d84558ee6cc2276212e"
  },
  {
    "url": "build/libs/webcomponentsjs/gulpfile.js",
    "revision": "1aac641003c7d14b266843d632cbf71f"
  },
  {
    "url": "build/libs/webcomponentsjs/webcomponents-hi-ce.js",
    "revision": "6e70d19aa72bca16779abfadceba8d58"
  },
  {
    "url": "build/libs/webcomponentsjs/webcomponents-hi-sd-ce.js",
    "revision": "874c3be210adb362d08aaf97bbb3f21b"
  },
  {
    "url": "build/libs/webcomponentsjs/webcomponents-hi-sd.js",
    "revision": "f1db6505f87f7a8660b566a0540e7e5b"
  },
  {
    "url": "build/libs/webcomponentsjs/webcomponents-hi.js",
    "revision": "c2270cd6fb0b95ed2f87c6b1c143c94f"
  },
  {
    "url": "build/libs/webcomponentsjs/webcomponents-lite.js",
    "revision": "7354f6c8fce5789ec22b2dbc045f9d52"
  },
  {
    "url": "build/libs/webcomponentsjs/webcomponents-loader.js",
    "revision": "f13bbbbf647b7922575a7894367ddaaf"
  },
  {
    "url": "build/libs/webcomponentsjs/webcomponents-sd-ce.js",
    "revision": "20b8283441ed3da5c6c69c5ea9c208ae"
  },
  {
    "url": "index.html",
    "revision": "6aee4e5c34d2177943c004072c6ebbdf"
  }
]);

workbox.routing.registerRoute(
  new RegExp('.*\.json'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerNavigationRoute('/index.html');
