export default {
    css: {
        base: `src/css`,
        get src() {
            return `${this.base}/**/*.scss`;
        },
        dest: `dist/css`
    },
    js: {
        // 源码位置,用于监听变化重新打包
        src: 'src/js/**/*.js',
        //入口文件
        input: 'src/js/index.js',
        //输出路径
        dest: `dist/js`,
        //输出路径
        get file() {
            return `${this.dest}/bootstrapValidation.js`;
        }
    }
}
