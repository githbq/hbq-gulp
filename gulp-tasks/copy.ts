import gulp = require('gulp')
import pump = require('pump')
import debug = require('gulp-debug')
import watch = require('gulp-watch')
import constants from './config/constants'
import rimraf = require('rimraf')

const { copy, distPath, isWatch } = constants

function getTasks(isWatch = false) {
    return [
        (isWatch ? watch : gulp.src)(copy.pattern, {}, function (e) {
            const filePath = e.history[e.history.length - 1]
            // console.log('-------history', e.history)
            // console.log('-------filePath', filePath)
            // console.log('-------unlink', e.event)
            switch (e.event) {
                case 'unlink': {
                    const filePattern = filePath + '*'
                    rimraf(filePattern, () => {
                        console.log(`文件:${filePattern} 已删除!`)
                    })
                } break
                case 'change': {

                } break
                case 'add': {

                } break
            }
        }),
        debug({ title: '复制:' }),
        gulp.dest(distPath)
    ]
}

/**
 * 监听文件
 */
gulp.task('copy-watch', function (cb) {
    pump(getTasks(true), cb)
})
/**
 * 复制文件
 */
gulp.task('copy', function (cb) {
    pump(getTasks(), cb)
})
export default ['copy', 'copy-watch']