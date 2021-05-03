const gulp = require('gulp');

const sass = require('gulp-sass');
const gulpAutoprefixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();

const imagemin = require('gulp-imagemin');

// Compile SCSS
function style() {
    // find where is scss files
    return gulp.src('./assets/stylesheet/scss/**/*.scss')
        // Source scss initiate
        .pipe(sourceMaps.init())
        // Compiling into CSS
        .pipe(sass())
        // autoprefixes the code
        .pipe(gulpAutoprefixer())
        // Provide scss file source
        .pipe(sourceMaps.write('./'))
        // saving complied css to dest
        .pipe(gulp.dest('./assets/stylesheet/css'))
        // saving complied css to dest
        .pipe(browsersync.stream())
}

// Optimise Images
function imageOpt() {
    return gulp.src('assets/img/*')
        .pipe(imagemin([
            // Compress GIF images
            imagemin.gifsicle({ interlaced: true }),
            // Compress JPEG images
            imagemin.mozjpeg({ progressive: true }),
            // Compress PNG images
            imagemin.optipng({ optimizationLevel: 5 }),
            // Compress SVG images
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        // saving Optimised images to dest
        .pipe(gulp.dest('assets/img'))
}

// Watch all while saving the file
function watch() {
    // browsersync.init({
    //     server: {
    //         baseDir: './'
    //     }
    // });
    gulp.watch('./assets/stylesheet/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browsersync.reload);
}





exports.style = style;
exports.watch = watch;
exports.imageOpt = imageOpt;


// var build = gulp.series(clean, gulp.parallel(style, imageOpt));
// gulp.task('build', build);
// gulp.task('default', build);