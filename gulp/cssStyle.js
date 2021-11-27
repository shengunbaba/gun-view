module.exports = function (gulp, path, tsOptions) {

    gulp.task('less', () => {
        return gulp.src([
            `${path}/**/*.less`,
            `!${path}/**/demo/*.less`])
            .pipe(gulp.dest(tsOptions.outDir))
    })
}
