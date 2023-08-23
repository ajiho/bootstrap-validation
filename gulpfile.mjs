import gulp from 'gulp';
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import gulpStylelint from '@ronilaukkarinen/gulp-stylelint';
import autoprefixer from "autoprefixer";
import cmq from 'node-css-mqpacker';
import cleanCss from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import gulpESLintNew from 'gulp-eslint-new'
import header from 'gulp-header'
import filter from 'gulp-filter'
import shell from 'gulp-shell'
import buildPath from "./src/config/buildPath.mjs";
import {getBanner} from "./src/config/utils.mjs";
import {deleteAsync} from 'del';

//sass
const sass = gulpSass(dartSass);


//eslint公共配置提取
const eslintConfig = {
    configType: 'flat',
    //配置文件
    overrideConfigFile: './eslint.config.mjs',
    //当 ESLint 忽略文件时添加结果警告
    warnIgnored: true,
}

//stylelint公共配置提取
const stylelintConfig = {
    //直接指定配置文件,避免stylelint去查找配置文件
    configFile: "./stylelint.config.mjs",
    //打印错误堆栈跟踪
    debug: true,
    //报错后是否直接终止程序,必须设置true:否则报错也会执行下面的任务
    failAfterError: true,
    //报错类型和格式处理
    reporters: [
        {formatter: 'string', console: true}
    ]
}


//css处理
gulp.task('css', gulp.series(
    function () {
        return gulp.src(buildPath.css.src)
            .pipe(gulpStylelint({
                ...stylelintConfig,
                fix: false,
            }))
    },
    async function () {
        //先清空dist/css
        await deleteAsync([buildPath.css.dest + '/*'], {dot: true})
        return gulp.src(buildPath.css.src)
            .pipe(header(getBanner()))
            .pipe(sass.sync({
                outputStyle: "expanded"
            }).on('error', sass.logError))
            .pipe(postcss([
                //给css添加前缀
                autoprefixer(),
                //合并媒体查询
                cmq({
                    sort: function (a, b) {//按照从@media max-width 高到低排列
                        let aMax = a.match(/\d+/)[0];
                        let bMax = b.match(/\d+/)[0];
                        return bMax - aMax;
                    }
                })
            ]))
            .pipe(sourcemaps.init())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(buildPath.css.dest))
            .pipe(cleanCss())
            .pipe(rename({suffix: '.min'}))
            .pipe(filter(['**/*.css']))//只处理css文件，解决多余的.map文件生成
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(buildPath.css.dest))
    }))


//用于在可能的情况下自动修复规则报告的问题
gulp.task('css:fix', function () {
    return gulp
        .src([buildPath.css.src])
        .pipe(gulpStylelint({
            ...stylelintConfig,
            //自动尽可能的修复
            fix: true,
        }))
        .pipe(gulp.dest(buildPath.css.base));
});


//打包js
gulp.task('js', gulp.series(
    function () {
        return gulp.src(buildPath.js.src)
            .pipe(gulpESLintNew({
               ...eslintConfig,
                fix:false,
            }))
            .pipe(gulpESLintNew.format())
            //检测到错误后立马退出
            .pipe(gulpESLintNew.failAfterError())
    },
    async function () {
        await deleteAsync([`${buildPath.js.dest}/*`], {dot: true})
    },
    shell.task("rollup --config rollup.config.mjs --bundleConfigAsCjs")
))

//用于修复js的问题
gulp.task('js:fix', function () {
    return gulp
        .src([buildPath.js.src])
        .pipe(gulpESLintNew({
            ...eslintConfig,
            //尽可能的修复
            fix:true,
        }))
        .pipe(gulpESLintNew.fix());
});


gulp.task("dev", function () {
    //监视css变化
    gulp.watch([buildPath.css.src], gulp.series('css'));
    //监视js变化
    gulp.watch([buildPath.js.src], gulp.series('js'));
});


