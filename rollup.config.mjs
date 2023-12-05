import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { globSync } from 'glob'
import { getBanner } from "./build/banner.mjs"
import { babel } from '@rollup/plugin-babel'

const files = globSync('src/i18n/*.js')

const config = []

const external = ['jquery']
const globals = {
    jquery: 'jQuery'
}

const plugins = [
    resolve(),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      }),
]




for (const file of files) {

    let out = `dist/js/${file.replace('src\\', '')}`
    let commonConfig = {
        banner: getBanner(),
        name: 'BootstrapValidation',
        format: 'umd',
        globals,
        sourcemap: false
    }

    config.push({
        input: file,
        output: [
            {
                ...commonConfig,
                file: out,
            },
            {
                ...commonConfig,
                file: out.replace(/\.js$/, '.min.js'),
                plugins: [terser({ compress: { drop_console: false } })],
            },
        ],
        external,
        plugins,
    })

}



const commonConfig = {
    banner: getBanner(),
    format: 'umd',
    name: 'BootstrapValidation',
    globals,
    sourcemap: true
};


let out = 'dist/js/bootstrap-validation.js';

config.push({
    input: 'src/bootstrap-validation.js',
    output: [
        {
            ...commonConfig,
            file: out,
        },
        {
            ...commonConfig,
            file: out.replace(/\.js$/, '.min.js'),
            plugins: [terser({ compress: { drop_console: false } })],
        }
    ],
    external,
    plugins
})



export default config;