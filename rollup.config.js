import uglify from 'rollup-plugin-uglify';

export default {
  input: 'public/src/components/app.js',
  output: {
    file: 'public/build/app.js',
    format: 'iife',
  },
  plugins: [
    // uglify(),
  ]
};
