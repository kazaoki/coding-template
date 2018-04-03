const gulp         = require('gulp');
const plumber      = require('gulp-plumber');
const rename       = require('gulp-rename');
const sourcemaps   = require('gulp-sourcemaps');
const sass         = require('gulp-sass');
const csslint      = require('gulp-csslint');
const autoPrefixer = require('gulp-autoprefixer');
const cssComb      = require('gulp-csscomb');
const cmq          = require('gulp-merge-media-queries');
const cleanCss     = require('gulp-clean-css');
const eslint       = require('gulp-eslint');
const uglify       = require('gulp-uglify');
const babel        = require('gulp-babel');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync');
const imageMin     = require('gulp-imagemin');
const cache        = require('gulp-cache');

/**
 * sass compile
 */
gulp.task('sass', ()=>{
	gulp.src(['src/scss/**/*.scss'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoPrefixer())
		.pipe(cssComb())
		.pipe(cmq({log:true}))
		.pipe(csslint())
		.pipe(csslint.formatter())
		// .pipe(gulp.dest('public/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cleanCss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.stream())
});

/**
 * JS(ES) compile
 */
gulp.task('js', ()=>{
	gulp.src(['src/js/**/*.js'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({presets: ['env']}))
		.pipe(eslint(
			{
				useEslintrc: false,
				// rules: {
				// 	'strict': 2
				// },
				globals: [
					'jQuery',
					'$'
				],
				envs: [
					'browser'
				]
			})
		)
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(concat('bundle.js'))
		// .pipe(gulp.dest('public/js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.stream())
});

/**
 * images compress
 */
gulp.task('image', ()=>{
	gulp.src(['src/images/**/*'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(cache(imageMin()))
		// .pipe(imageMin())
		.pipe(gulp.dest('public/images'))
});

/**
 * watch files change
 */
gulp.task('watch', ()=>{
	gulp.watch('src/js/**/*.js',['js']);
	gulp.watch('src/scss/**/*.scss',['sass']);
});

/**
 * Sync server proxy: http://localhost:3000 -> localhost:80
 */
gulp.task('server', ()=>{
	browserSync.init({proxy: 'localhost'});
});

/**
 * build & watch
 */
gulp.task('dev', ['js', 'sass', 'image', 'server', 'watch']);

/**
 * build only (default))
 */
gulp.task('default', ['js', 'sass', 'image']);
