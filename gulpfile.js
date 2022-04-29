const {series, parallel, src, dest} = require('gulp');
const clear = require('gulp-clean');
const ts = require('gulp-typescript');
const tsOption = require('./tsconfig.json');

const outDir = tsOption.compilerOptions.outDir + '/';

const tsProject = ts.createProject('tsconfig.json',{...tsOption.compilerOptions, declaration: true});

function clean() {
    return src('./lib', {read: false, allowEmpty: true}).pipe(clear());
}

function javascript() {
    return src([
        `./src/component/**/*.tsx`,
        `./src/component/**/*.ts`,
        `!./src/component/**/demo/*.tsx`]).pipe(tsProject()).pipe(dest(outDir));
}

function css() {
    return src([
        `./src/component/**/*.less`,
        `!./src/component/**/demo/*.less`]).pipe(dest(outDir));

}

exports.build = series(clean, parallel(css, javascript));
