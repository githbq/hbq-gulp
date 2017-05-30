let gulp = require('gulp')
let clean = require('gulp-clean')
let pump = require('pump')

gulp.task('clean', function(cb) {
    pump([
            gulp.src('dist', { read: false }),
            clean()
        ],
        cb
    )
})