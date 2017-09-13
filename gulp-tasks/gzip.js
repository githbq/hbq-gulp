const gulp = require('gulp')
const pump = require('pump')
const plumber = require('gulp-plumber')
const gzip = require('gulp-gzip')
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
