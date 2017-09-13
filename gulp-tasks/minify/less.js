const gulp = require('gulp')
const watch = require('gulp-watch')
const minifyCss = require('gulp-minify-css')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const pump = require('pump')
const gulpCopy = require('gulp-copy')
const plumber = require('gulp-plumber')
const debug = require('gulp-debug')

const rimraf = require('rimraf')
const copy = require('copy')
const filter = require('gulp-filter')
const gzip = require('gulp-gzip')

const gulpLess = require('gulp-less')

const { less, distPath, isGzip } = require('../config/constants')

function getTasks(isWatch) {
    return [
        (isWatch ? watch : gulp.src)(less.pattern, {}, function (e) {
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
        gulpLess(),
        gulp.dest(distPath),
        minifyCss(),
        rename({ suffix: '.min' }),
        sourcemaps.write('.'),
        gulp.dest(distPath),
        filter(['**/*.min.css']),
        ...(isGzip ? [gzip({
            extension: 'gzip', append: true,
            threshold: false
        })] : []),
        gulp.dest(distPath),
    ]
}
/**
 * 监听文件
 */
gulp.task('less-watch', function (cb) {
    pump(getTasks(true), cb)
})
/**
 * 压缩css
 */
gulp.task('less', function (cb) {
    pump(getTasks(), cb)
})

module.exports = ['less', 'less-watch']