import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'client/src/index.js',
  dest: 'public/bundle.js',
  plugins: [
    resolve({ jsnext: true }),
    commonjs(),
    babel()
  ]
}
