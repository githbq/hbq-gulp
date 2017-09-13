const gzip = require('gulp-gzip')
module.exports = {
    get(options) {
        return gzip({
            extension: 'gzip', append: true,
            threshold: false,
            ...options
        })
    }
}