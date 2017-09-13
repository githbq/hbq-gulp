const gulp = require('gulp')  
const pump = require('pump') 
/**
 * 压缩js
 */
gulp.task('copy', function (cb) {
    // the same options as described above 
    const options = {}
    pump([
        gulp.src(['src/**/*.*', "!src/**/*min.*"]),
        gulp.dest('dist')
    ],
        cb
    )
})
module.exports = ['copy']