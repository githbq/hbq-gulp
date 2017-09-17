import gulp = require('gulp')
import watch = require('gulp-watch')
import minifyCss = require('gulp-minify-css')
import rename = require('gulp-rename')
import sourcemaps = require('gulp-sourcemaps')
import pump = require('pump')
import plumber = require('gulp-plumber')
import debug = require('gulp-debug')

import filter = require('gulp-filter')
import gzip = require('gulp-gzip')
import autoprefixer = require('gulp-autoprefixer')

import constants from '../config/constants'


const { css, distPath, isGzip } = constants


function getTasks(isWatch = false) {
    return [
        (isWatch ? watch : gulp.src)(css.pattern, {}),
        debug({ title: '编译:' }),
        plumber(),
        autoprefixer({
            browsers: [
                'ie >= 9',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10'
            ],
            cascade: false
        }),
        gulp.dest(distPath),
        sourcemaps.init(),
        minifyCss(),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest(distPath),
        filter(['**/*.min.css']),
        ...(isGzip ? [gzip({
            extension: 'gzip', append: true,
            threshold: false
        })] : []),
        gulp.dest(distPath),
    ]
}
/**
 * 监听文件
 */
gulp.task('css-watch', function (cb) {
    pump(getTasks(true), cb)
})
/**
 * 压缩css
 */
gulp.task('css', function (cb) {
    pump(getTasks(), cb)
})

export default ['css', 'css-watch']