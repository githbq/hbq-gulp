const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
const pathTool = require('path')
const requireTask = (...paths) => {
    return require(pathTool.resolve('gulp-tasks', ...paths))
}

gulp.task('default', function (cb) {
    gulpSequence(
        requireTask('clean'),
        requireTask('copy'),
        requireTask('minify'),
        cb
    )
})