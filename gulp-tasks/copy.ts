import gulp = require('gulp')
import pump = require('pump')
import debug = require('gulp-debug')
import watch = require('gulp-watch')
import constants from './config/constants'
import rimraf = require('rimraf')
const pathTool = require('path')

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
                    const extname = pathTool.extname(filePath)
                    const filePattern = filePath.replace(extname, '') + '?(.min)' + extname + '?(.map)' + '?(.*zip)'
                    rimraf(filePattern, (error, e) => {
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