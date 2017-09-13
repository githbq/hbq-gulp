import gulp = require('gulp')
import gulpSequence = require('gulp-sequence')
import pathTool = require('path')
import constants from './gulp-tasks/config/constants'

const requireTask = (...paths) => {
    return require(pathTool.resolve('gulp-tasks', ...paths)).default
}

const cleanTasks = requireTask('clean')
const minifyTasks = requireTask('minify')
const copyTasks = requireTask('copy')

const allTasks = [...cleanTasks, ...copyTasks, ...minifyTasks]

const { isWatch } = constants
 
const exceptWatch = (arr) => {
    return arr.filter(n => n.indexOf('watch') < 0)
}

gulp.task('default', function (cb) {
    gulpSequence(
        exceptWatch(cleanTasks),
        exceptWatch(copyTasks),
        exceptWatch(minifyTasks),
        isWatch ? allTasks.filter(n => n.indexOf('watch') > 0) : [],
        cb
    )
})