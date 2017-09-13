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

import gulpLess = require('gulp-less')
import constants from '../config/constants'
const { less, distPath, isGzip } = constants

function getTasks(isWatch = false) {
    return [
        (isWatch ? watch : gulp.src)(less.pattern, {}),
        debug({ title: '编译:' }),
        plumber(),
        sourcemaps.init(),
        gulpLess(),
        gulp.dest(distPath),
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
gulp.task('less-watch', function (cb) {
    pump(getTasks(true), cb)
})
/**
 * 压缩css
 */
gulp.task('less', function (cb) {
    pump(getTasks(), cb)
})

export default ['less', 'less-watch']