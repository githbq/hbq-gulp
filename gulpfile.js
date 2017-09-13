const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
const pathTool = require('path')
const requireTask = (...paths) => {
    return require(pathTool.resolve('gulp-tasks', ...paths))
}
const minifyTasks = requireTask('minify')
gulp.task('default', function (cb) {
    gulpSequence(
        requireTask('clean'),
        requireTask('copy'),
        minifyTasks.filter(n => n.indexOf('watch') < 0),
        minifyTasks.filter(n => n.indexOf('watch') > 0),
        cb
    )
})