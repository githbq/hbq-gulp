 let gulp = require('gulp')
 let minifyCss = require('gulp-minify-css')
 let rename = require('gulp-rename')
 let sourcemaps = require('gulp-sourcemaps') 
 let pump = require('pump')
 /**
  * 压缩css
  */
 gulp.task('css', function(cb) {
     // the same options as described above 
     let options = {}
     pump([
             gulp.src(['src/**/*.css', "!src/**/*min.css"]),
             sourcemaps.init(),
             minifyCss(),
             rename({ suffix: ".min" }),
             sourcemaps.write('.'),
             gulp.dest('dist')
         ],
         cb
     )
 })