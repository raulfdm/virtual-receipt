const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postImport = require('postcss-import');
const browser = require('browser-sync');
const cssNano = require('gulp-cssnano');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const htmlminify = require("gulp-html-minify");
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const ghPages = require('gulp-gh-pages');

gulp.task('css', () => {
		return gulp
				.src('src/css/index.css')
				.pipe(postcss([autoprefixer(), postImport()]))
				.pipe(cssNano())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest('dist/'))
});

gulp.task('babel', () => {
		return gulp
				.src(['./src/js/product.js', './src/js/**.js'])
				.pipe(sourcemaps.init())
				.pipe(babel())
				.pipe(jsmin())
				.pipe(concat('index.min.js'))
				.pipe(sourcemaps.write("."))
				.pipe(gulp.dest('dist/'))
})

gulp.task('html', () => {
		return gulp
				.src('./src/**.html')
				.pipe(htmlminify())
				.pipe(gulp.dest('dist/'))
})

gulp.task('clean', () => {
		return gulp
				.src('dist/')
				.pipe(clean())
})

gulp.task('ghpages', () => {
		return gulp
				.src('./dist/**.*')
				.pipe(ghPages())
})

gulp.task('build', ['clean'], () => gulp.start(['babel', 'css', 'html']))

gulp.task('sv', () => {

    browser.init({
        server: {
            baseDir: 'dist',
            index: "index.html"
        }
    });

    gulp
        .watch('src/**/*.*', ['build'])
        .on('change', browser.reload);

});
