import gulp = require('gulp')
import clean = require('gulp-clean')
import pump = require('pump')
import gulpCopy = require('gulp-copy')
import constants from './config/constants'
const { distPath } = constants

gulp.task('clean', function (cb) {
    pump([
        gulp.src(distPath, { read: false }),
        clean()
    ],
        cb
    )
})
export default ['clean']