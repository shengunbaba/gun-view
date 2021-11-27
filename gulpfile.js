const gulp = require('gulp')
const runSequence = require('run-sequence')

const path = 'src/component'
const tsOptions = require('./tsconfig.json').compilerOptions
tsOptions.declaration = true

const gulpTaskList = require('fs').readdirSync('./gulp')
gulpTaskList.forEach((item) => {
    require(`./gulp/${item}`)(gulp, path, tsOptions)
})

gulp.task('build', (cb) => {
    runSequence(
        'cleanLib',
        'buildJs',
        'buildCss',
        cb
    )
})





