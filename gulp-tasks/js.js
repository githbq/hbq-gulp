let gulp = require('gulp')
let clean = require('gulp-clean')
let rename = require("gulp-rename")
let composer = require('gulp-uglify/composer')
let sourcemaps = require('gulp-sourcemaps') 
let uglifyjs = require('uglify-js')

let pump = require('pump')

let minify = composer(uglifyjs, console)

/**
 * 压缩js
 */
gulp.task('js', function(cb) {
    // the same options as described above 
    let options = {}
    pump([
            gulp.src(['src/**/*.js', "!src/**/*min.js"]),
            sourcemaps.init(),
            minify(options),
            rename({ suffix: ".min" }),
            sourcemaps.write('.'),
            gulp.dest('dist')
        ],
        cb
    )
})
 