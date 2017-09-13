const gulp = require('gulp')
const pump = require('pump')
const { copy, distPath } = require('./config/constants')
/**
 * 压缩js
 */
gulp.task('copy', function (cb) {
    // the same options as described above 
    const options = {}
    pump([
        gulp.src(copy.pattern),
        gulp.dest(distPath)
    ],
        cb
    )
})
module.exports = ['copy']