let gulp = require('gulp')
let gulpSequence = require('gulp-sequence')
require('require-dir')('./gulp-tasks')

gulp.task('default', function(cb) {
    gulpSequence('clean', ['js', 'css'], cb)
})