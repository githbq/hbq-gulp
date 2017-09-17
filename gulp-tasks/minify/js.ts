import gulp = require('gulp')
import watch = require('gulp-watch')
import clean = require('gulp-clean')
import rename = require('gulp-rename')
import composer = require('gulp-uglify/composer')
import sourcemaps = require('gulp-sourcemaps')
import uglifyjs = require('uglify-js')
import pump = require('pump')
import plumber = require('gulp-plumber')
import debug = require('gulp-debug')

import filter = require('gulp-filter')
import gzip = require('gulp-gzip')
const babel = require('gulp-babel')
import browserify = require('gulp-browserify')

const minify = composer(uglifyjs, console)
import constants from '../config/constants'
const { js, distPath } = constants

function getTasks(isWatch = false) {
    const minifyOptions = {}
    return [
        (isWatch ? watch : gulp.src)(js.pattern, {}),
        debug({
            title: '编译:'
        }),
        plumber(),
        babel({
            presets: ['env']
        }),
        browserify({
            insertGlobals: false
        }),
        gulp.dest(distPath),
        sourcemaps.init(),
        minify(minifyOptions),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest(distPath),
        filter(['**/*.min.js']),
        gzip({
            extension: 'gzip', append: true,
            threshold: false
        }),
        gulp.dest(distPath),
    ]
}
/**
 * 监听
 */
gulp.task('js-watch', function (cb) {
    pump(getTasks(true), cb)
})

/**
 * 压缩js
 */
gulp.task('js', function (cb) {
    pump(getTasks(), cb)
})

export default ['js', 'js-watch']