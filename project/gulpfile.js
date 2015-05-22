var compass, concat, config, gulp, install, uglify;

gulp = require('gulp');
concat = require('gulp-concat');
compass = require('gulp-compass');
install = require('gulp-install');
watch = require('gulp-watch');
uglify = require('gulp-uglify');

config = require('./frontend/config');

//bower
gulp.task('bower', function() {
    return gulp.src(['./frontend/bower.json'])
        .pipe(install());
});


//vendors
gulp.task('vendors:css', function() {
    return gulp.src(config.vendors.css.src)
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest(config.vendors.css.dest));
});

gulp.task('vendors:js', function() {
    return gulp.src(config.vendors.js.src)
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.vendors.js.dest));
});

gulp.task('vendors:fonts', function() {
    return gulp.src(config.vendors.fonts.src)
        .pipe(gulp.dest(config.vendors.fonts.dest));
});

gulp.task('vendors', ['vendors:css', 'vendors:js', 'vendors:fonts']);




gulp.task('js', function() {
    return gulp.src(config.js.src)
        .pipe(concat('scripts.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('css', function() {
    return gulp.src(config.css.src)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('fonts', function() {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('compass', function() {
    return gulp.src(config.compass.src)
        .pipe(compass({
            project: __dirname + '/frontend',
            css: 'css',
            image: 'images'
        }))
        .on('error', function(error) {
            return this.emit('end');
        })
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(config.compass.dest));
});

gulp.task('templates', function() {
    return gulp.src(config.templates.src)
        .pipe(gulp.dest(config.templates.dest));
});

gulp.task('images', function() {
    return gulp.src(config.images.src)
        .pipe(gulp.dest(config.images.dest));
});

gulp.task('json', function() {
    return gulp.src(config.json.src)
        .pipe(gulp.dest(config.json.dest));
});

gulp.task('sounds', function() {
    return gulp.src(config.sounds.src)
        .pipe(gulp.dest(config.sounds.dest));
});

gulp.task('watch', function() {
    gulp.watch(config.vendors.js.src, ['vendors:js']);
    gulp.watch(config.vendors.fonts.src, ['vendors:fonts']);
    gulp.watch(config.vendors.css.src, ['vendors:css']);
    gulp.watch(config.js.src, ['js']);
    gulp.watch(config.css.src, ['css']);
    gulp.watch(config.templates.src, ['templates']);
    gulp.watch(config.images.src, ['images']);
});

gulp.task('dev', ['vendors', 'js', 'css', 'templates', 'fonts', 'images', 'sounds', 'json', 'watch']);

gulp.task('default', ['vendors', 'js', 'css', 'templates', 'fonts', 'images', 'sounds']);

gulp.task('help', function() {
    console.log('Using: \n    - dev = default + watch', "\n    - default: \n\tvendors, js, css,  templates, fonts, images, sounds", "\n    - bower: install bower packages");
    return 0;
});