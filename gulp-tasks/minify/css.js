const gulp = require('gulp')
const watch = require('gulp-watch')
const minifyCss = require('gulp-minify-css')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const pump = require('pump')
const gulpCopy = require('gulp-copy')
const plumber = require('gulp-plumber')
const debug = require('gulp-debug')
const { css, distPath } = require('../config/constants')
const rimraf = require('rimraf')
const copy = require('copy')
function getTasks(isWatch) {
    return [
        (isWatch ? watch : gulp.src)(css.pattern, {}, function (e) {
            const filePath = e.history[e.history.length - 1]
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
        debug({
            title: '编译:'
        }),
        plumber(),
        sourcemaps.init(),
        minifyCss(),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest(distPath)
    ]
}
/**
 * 监听文件
 */
gulp.task('css-watch', function (cb) {
    pump(getTasks(true), cb)
})
/**
 * 压缩css
 */
gulp.task('css', function (cb) {
    pump(getTasks(), cb)
})

module.exports = ['css', 'css-watch']