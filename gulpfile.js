var gulp = require('gulp')
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var composer = require('gulp-uglify/composer');
var sourcemaps = require('gulp-sourcemaps');


var uglifyjs = require('uglify-js');
var pump = require('pump');


var minify = composer(uglifyjs, console);

gulp.task('js', ['clean'], function(cb) {
    // the same options as described above 
    var options = {};
    pump([
            gulp.src(['js/**/*.js', "!js/**/*min.js"]),
            sourcemaps.init(),
            minify(options),
            rename({ suffix: ".min" }),
            sourcemaps.write('.'),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});