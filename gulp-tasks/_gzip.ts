import gulp = require('gulp')
import pump = require('pump')
import plumber = require('gulp-plumber')
import gzip = require('gulp-gzip')
/**
 * 生成gzip文件
 */
gulp.task('gzip', function (cb) {
    pump([
        gulp.src(['dist/**/*.min.*', '!dist/**/*.map']),
        plumber(),
        gzip({
            extension: 'gzip', append: true,
            threshold: false
        }),
        gulp.dest('dist')
    ],
        cb
    )
})
export default ['gzip']
