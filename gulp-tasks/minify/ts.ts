import gulp = require('gulp')
import watch = require('gulp-watch')
import rename = require('gulp-rename')
import composer = require('gulp-uglify/composer')
import sourcemaps = require('gulp-sourcemaps')
import uglifyjs = require('uglify-js')
import pump = require('pump')
import plumber = require('gulp-plumber')
import debug = require('gulp-debug')

import filter = require('gulp-filter')
import gzip = require('gulp-gzip')
import gulpTs = require('gulp-typescript')
import browserify = require('gulp-browserify')
const minify = composer(uglifyjs, console)

import constants from '../config/constants'
const { ts, distPath, isGzip } = constants

// const tsProject = gulpTs.createProject('tsconfig.json')

function getTasks(isWatch = false) {
    const minifyOptions = {}
    return [
        (isWatch ? watch : gulp.src)(ts.pattern, {}),
        debug({ title: '编译:' }),
        plumber(),
        gulp.dest(distPath),
        sourcemaps.init(),
        gulpTs(
            {
            }
        ),
        browserify({
            insertGlobals: false
        }),
        gulp.dest(distPath),
        minify(minifyOptions),
        rename({ suffix: '.ts.min' }),
        sourcemaps.write('.'),
        gulp.dest(distPath),
        filter(['**/*.min.js']),
        ...(isGzip ? [gzip({
            extension: 'gzip',
            append: true,
            threshold: false
        })] : []),
        gulp.dest(distPath),
    ]
}
/**
 * 监听
 */
gulp.task('ts-watch', function (cb) {
    pump(getTasks(true), cb)
})

/**
 * 压缩js
 */
gulp.task('ts', function (cb) {
    pump(getTasks(), cb)
})

export default ['ts', 'ts-watch']