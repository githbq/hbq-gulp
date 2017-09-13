const gulp = require('gulp')
const minifyCss = require('gulp-minify-css')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const pump = require('pump')
const gulpCopy = require('gulp-copy')
const plumber = require('gulp-plumber')
const debug = require('gulp-debug')
const { css, distPath } = require('./config/constants')

/**
 * 压缩css
 */
gulp.task('css', function (cb) {
    // the same options as described above 
    const options = {}
    pump([
        gulp.src(css.pattern),
        debug({
            title: '编译:'
        }),
        plumber(),
        sourcemaps.init(),
        minifyCss(),
        rename({ suffix: ".min" }),
        sourcemaps.write('.'),
        gulp.dest(distPath)
    ],
        cb
    )
})