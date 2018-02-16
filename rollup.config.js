import fs from 'fs-extra';
import uglify from 'rollup-plugin-uglify';

const now = Date.now();

fs.ensureDirSync('build');
fs.emptyDirSync('build');
fs.ensureDirSync('build/public/images');
fs.ensureDirSync('build/public/js');
fs.ensureDirSync('build/public/libs');
fs.ensureDirSync('build/public/libs/webcomponentsjs');

const filesToCopy = [{
  from: 'functions/index-template.js',
  to: 'functions/index.js',
}, {
  from: 'public/index.html',
  to: 'build/public/index.html',
}, {
  from: 'public/images/logo.svg',
  to: `build/public/images/logo.svg`,
}, {
  from: 'public/images/loading.svg',
  to: `build/public/images/loading.svg`,
}, {
  from: 'public/images/icon.png',
  to: `build/public/images/icon.png`,
}, {
  from: 'public/images/icon-512.png',
  to: `build/public/images/icon-512.png`,
}, {
  from: 'public/sw.js',
  to: 'build/public/sw.js',
}, {
  from: 'public/manifest.json',
  to: 'build/public/manifest.json',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-ce.js',
  to: 'build/public/libs/webcomponentsjs/webcomponents-hi-ce.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js',
  to: 'build/public/libs/webcomponentsjs/webcomponents-hi-sd-ce.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd.js',
  to: 'build/public/libs/webcomponentsjs/webcomponents-hi-sd.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi.js',
  to: 'build/public/libs/webcomponentsjs/webcomponents-hi.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
  to: 'build/public/libs/webcomponentsjs/webcomponents-loader.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js',
  to: 'build/public/libs/webcomponentsjs/webcomponents-sd-ce.js',
}];

filesToCopy.forEach((file) => {
  fs.copyFileSync(file.from, file.to);
});

const html = fs.readFileSync('public/index.html', 'utf-8');

const replacements = [{
  files: ['functions/index.js', 'build/public/sw.js'],
  replace: [{
    from: /\[\[html\]\]/,
    to: html.replace(/`/g, '\`'),
  }, {
    from: '// preload-cache',
    to: `
      <script>
        document.querySelector('x-app').cache = {
          items: {},
          lists: {
            news: {
              '1': {
                list: \${JSON.stringify(items)},
                time: \${now},
              }
            },
            newest: {},
            show: {},
            ask: {},
            jobs: {},
          },
          maxAge: 60 * 1000 * 10,
        };
      </script>
    `,
  }, {
    from: /\/js\/app\.js/g,
    to: `/js/app-${now}.js`,
  }, {
    from: /\[\[rev\]\]/g,
    to: now,
  }],
}, {
  files: ['build/public/index.html'],
  replace: [{
    from: /\/js\/app\.js/g,
    to: `/js/app-${now}.js`,
  }],
}];

replacements.forEach((replacement) => {
  replacement.files.forEach((file) => {
    let input = fs.readFileSync(file, 'utf-8')
    replacement.replace.forEach((replace) => {
      input = input.replace(replace.from, replace.to);
    });
    fs.writeFileSync(file, input);
  });
});;

export default {
  input: './public/src/components/app.js',
  output: {
    file: `./build/public/js/app-${now}.js`,
    format: 'iife',
  },
  plugins: [
    uglify(),
  ]
};
