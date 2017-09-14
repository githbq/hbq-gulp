import { argv } from 'yargs'
// console.log('argv', argv)
export default {
    css: {
        pattern: ['src/**/*.css', "!src/**/*min.*"]
    },
    less: {
        pattern: ['src/**/*.less']
    },
    ts: {
        pattern: ['src/**/*.ts', "!src/**/*min.*"]
    },
    js: {
        pattern: ['src/**/*.js', "!src/**/*min.*"]
    },
    gzip: {
        pattern: ['dist/**/*.min.*', '!dist/**/*.map']
    },
    copy: {
        pattern: ['src/**/*']
    },
    distPath: 'dist',
    isGzip: argv.gzip,
    isWatch: argv.watch
}