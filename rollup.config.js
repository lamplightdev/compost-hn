import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'public/src/components/app.js',
  output: {
    file: 'public/build/app.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    babel(),
    uglify(),
  ]
};
