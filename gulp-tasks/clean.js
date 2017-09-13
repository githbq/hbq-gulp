const gulp = require('gulp')
const clean = require('gulp-clean')
const pump = require('pump')
const gulpCopy = require('gulp-copy')
const { distPath } = require('./config/constants')

gulp.task('clean', function (cb) {
    pump([
        gulp.src(distPath, { read: false }),
        clean()
    ],
        cb
    )
})