module.exports = {
    css: {
        pattern: ['src/**/*.css', "!src/**/*min.*"]
    },
    js: {
        pattern: ['src/**/*.js', "!src/**/*min.*"]
    },
    gzip: {
        pattern: ['dist/**/*.min.*', '!dist/**/*.map']
    },
    copy:{
        pattern:['src/**/*.*', "!src/**/*min.*"]
    },
    distPath: 'dist'
}