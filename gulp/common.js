const clean = require('gulp-clean')
const runSequence = require('run-sequence')

module.exports = function (gulp, path, tsOptions) {
    gulp.task('buildJs', (cb) => {
        runSequence(
            'js',
            cb
        )
    })

    gulp.task('buildCss', (cb) => {
        runSequence(
            'less',
            cb
        )
    })
    gulp.task('cleanLib', () => {
        return gulp.src('./lib', {read: false})
            .pipe(clean());
    })
}
