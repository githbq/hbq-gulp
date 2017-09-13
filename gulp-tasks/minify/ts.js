const gulp = require('gulp')
const watch = require('gulp-watch')
const rename = require("gulp-rename")
const composer = require('gulp-uglify/composer')
const sourcemaps = require('gulp-sourcemaps')
const uglifyjs = require('uglify-js')
const pump = require('pump')
const gulpCopy = require('gulp-copy')
const plumber = require('gulp-plumber')
const debug = require('gulp-debug')

const filter = require('gulp-filter')
const gzip = require('gulp-gzip')
const gulpTs = require('gulp-typescript')
const rimraf = require('rimraf')

const minify = composer(uglifyjs, console)
const { ts, distPath, isGzip } = require('../config/constants')

const tsProject = gulpTs.createProject('tsconfig.json')

function getTasks(isWatch) {
    const minifyOptions = {}
    return [
        (isWatch ? watch : gulp.src)(ts.pattern, {}, function (e) {
            const filePath = e.history[e.history.length - 1]
            console.log('-------filePath', filePath)
            console.log('-------unlink', e.event)
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
        debug({ title: '编译:' }),
        plumber(),
        sourcemaps.init(),
        tsProject(),
        // minify(minifyOptions),
        // rename({ suffix: ".min" }),
        sourcemaps.write('.'),
        // gulp.dest(distPath),
        // filter(['**/*.min.js']),
        // ...(isGzip ? [gzip({
        //     extension: 'gzip', append: true,
        //     threshold: false
        // })] : []),
        gulp.dest(distPath),
    ]
}
/**
 * 监听
 */
gulp.task('ts-watch', function (cb) {
    pump(getTasks(true), cb)
})

/**
 * 压缩js
 */
gulp.task('ts', function (cb) {
    pump(getTasks(), cb)
})

module.exports = ['ts', 'ts-watch']