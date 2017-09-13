const gulp = require('gulp')
const watch = require('gulp-watch')
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

const { js, distPath } = require('../config/constants')

function getTasks(isWatch) {
    const minifyOptions = {}
    return [
        (isWatch ? watch : gulp.src)(js.pattern, {}, function (e) {
            const filePath = e.history[e.history.length - 1]
            if (e.event === 'unlink') {
                rimraf(filePath + '*')
            }
        }),
        debug({
            title: '编译:'
        }),
        plumber(),
        sourcemaps.init(),
        minify(minifyOptions),
        rename({ suffix: ".min" }),
        sourcemaps.write('.'),
        gulp.dest(distPath)
    ]
}
/**
 * 监听
 */
gulp.task('js-watch', function (cb) {
    pump(
        getTasks(true)
        ,
        cb
    )
})
/**
 * 压缩js
 */
gulp.task('js', function (cb) {
    pump(
        getTasks()
        ,
        cb
    )
})

module.exports = ['js-watch', 'js']