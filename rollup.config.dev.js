import fs from 'fs-extra';

fs.ensureDirSync('./public/js');
fs.emptyDirSync('./public/js');
fs.ensureDirSync('./public/libs');
fs.emptyDirSync('./public/libs');
fs.ensureDirSync('./public/libs/webcomponentsjs');

const filesToCopy = [{
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-ce.js',
  to: './public/libs/webcomponentsjs/webcomponents-hi-ce.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js',
  to: './public/libs/webcomponentsjs/webcomponents-hi-sd-ce.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd.js',
  to: './public/libs/webcomponentsjs/webcomponents-hi-sd.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-hi.js',
  to: './public/libs/webcomponentsjs/webcomponents-hi.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
  to: './public/libs/webcomponentsjs/webcomponents-loader.js',
}, {
  from: './node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js',
  to: './public/libs/webcomponentsjs/webcomponents-sd-ce.js',
}];

filesToCopy.forEach((file) => {
  fs.copyFileSync(file.from, file.to);
});


export default {
  input: './public/src/components/app.js',
  output: {
    file: `./public/js/app.js`,
    format: 'iife',
  },
  plugins: [
  ]
};
