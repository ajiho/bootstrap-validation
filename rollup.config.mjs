import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import {getBanner} from './config/utils.mjs'
import buildPath from "./config/buildPath.mjs";



//公共的属性提取
const outputConfig = {
    banner: getBanner(),
    format: 'umd',
    name: buildPath.js.name,
    globals: {
        'jquery': 'jQuery'
    },
    sourcemap: true
};

export default {
    input: buildPath.js.input,
    output: [
        {
            ...outputConfig,
            file: buildPath.js.file,
        },
        {
            ...outputConfig,
            file: buildPath.js.file.replace(/\.js$/, '.min.js'), // 压缩版本的输出路径
            plugins: [terser({compress: {drop_console: false}})],
        }
    ],
    external: ['jquery'],
    plugins: [
        resolve(),
        commonjs()
    ]
};
