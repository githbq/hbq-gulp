const gulp = require('gulp')
const clean = require('gulp-clean')
const rename = require("gulp-rename")
const composer = require('gulp-uglify/composer')
const sourcemaps = require('gulp-sourcemaps')
const uglifyjs = require('uglify-js')
const pump = require('pump')
const gulpCopy = require('gulp-copy')
const plumber = require('gulp-plumber')

const minify = composer(uglifyjs, console)
const debug = require('gulp-debug')

const { js, distPath } = require('./config/constants')
/**
 * 压缩js
 */
gulp.task('js', function (cb) {
    // the same options as described above 
    const options = {}
    pump([
        gulp.src(js.pattern),
        debug({
            title: '编译:'
        }),
        plumber(),
        sourcemaps.init(),
        minify(options),
        rename({ suffix: ".min" }),
        sourcemaps.write('.'),
        gulp.dest(distPath)
    ],
        cb
    )
})
