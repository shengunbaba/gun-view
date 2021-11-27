const ts = require('gulp-typescript')

module.exports = function (gulp, path, tsOptions) {
    const tsProject = ts.createProject(tsOptions)
    gulp.task('js', () => {
        return gulp.src([
            `${path}/**/*.tsx`,
            `${path}/**/*.ts`,
            `!${path}/**/demo/*.tsx`])
            .pipe(tsProject())
            .pipe(gulp.dest(tsOptions.outDir))
    })
}



