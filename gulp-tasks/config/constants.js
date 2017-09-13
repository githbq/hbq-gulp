module.exports = {
    css: {
        pattern: ['src/**/*.css', "!src/**/*min.*"]
    },
    less: {
        pattern: ['src/**/*.less']
    },
    js: {
        pattern: ['src/**/*.js', "!src/**/*min.*"]
    },
    gzip: {
        pattern: ['dist/**/*.min.*', '!dist/**/*.map']
    },
    copy: {
        pattern: ['src/**/*.{js,html,css,json,md}']
    },
    distPath: 'dist'
}