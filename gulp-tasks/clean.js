const gulp = require('gulp')
const clean = require('gulp-clean')
const pump = require('pump')
const gulpCopy = require('gulp-copy')

gulp.task('clean', function (cb) {
    pump([
        gulp.src('dist', { read: false }),
        clean()
    ],
        cb
    )
})