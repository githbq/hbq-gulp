const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
require('require-dir')('./gulp-tasks')

gulp.task('default', function (cb) {
    gulpSequence('clean', 'copy', ['js', 'css'], 'gzip', cb)
})