var bower, dest, src;

src = __dirname;

dest = __dirname + '/../static/frontend';

bower = src + '/bower_components';

module.exports = {
    css: {
        src: [src + '/css/**/*.css'],
        dest: dest + '/css'
    },
    compass: {
        src: [src + '/css/**/*.css'],
        dest: dest + '/css'
    },
    js: {
        src: [src + '/js/**/*.js'],
        dest: dest + '/js'
    },
    templates: {
        src: [src + '/templates/**/*.html'],
        dest: dest + '/templates'
    },
    images: {
        src: [src + '/images/**/*.*'],
        dest: dest + '/images'
    },
    json: {
        src: [src + '/json/**/*.*'],
        dest: dest + '/json'
    },
    sounds: {
        src: [src + '/sounds/**/*.*'],
        dest: dest + '/sounds'
    },
    fonts: {
        src: [src + '/fonts/**/*.*'],
        dest: dest + '/fonts'
    },
    vendors: {
        css: {
            src: [
                bower + '/bootswatch-dist/css/bootstrap.css',
                bower + '/css-toggle-switch/dist/toggle-switch.css',
                bower + '/fontawesome/css/font-awesome.css',
                bower + '/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
                bower + '/jquery.taginput/src/jquery.taginput.css',
                bower + '/bootstrap-star-rating/css/star-rating.css',
                bower + '/Hover/css/hover.css',
                bower + '/angular-ui-select/dist/select.css'
            ],
            dest: dest + '/css'
        },
        js: {
            src: [
                bower + '/jquery/dist/jquery.js',
                bower + '/jquery.taginput/src/jquery.taginput.src.js',
                bower + '/bootswatch-dist/js/bootstrap.js',
                bower + '/bootswatch-dist/js/bootstrap.js',
                bower + '/moment/moment.js',
                bower + '/moment/locale/ru.js',
                bower + '/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                bower + '/angular/angular.js',
                bower + '/angular-ui-router/release/angular-ui-router.js',
                bower + '/angular-translate/angular-translate.js',
                bower + '/angular-cookies/angular-cookies.js',
                bower + '/bootstrap-star-rating/js/star-rating.js',
                bower + '/angular-translate-loader-url/angular-translate-loader-url.js',
                bower + '/angular-animate/angular-animate.js',
                bower + '/angular-bootstrap/ui-bootstrap.js',
                bower + '/angular-bootstrap/ui-bootstrap-tpls.js',
                bower + '/angular-sanitize/angular-sanitize.js',
                bower + '/angular-ui-select/dist/select.js',
                bower + '/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                bower + '/lodash/dist/lodash.js',
                bower + '/angular-google-maps/dist/angular-google-maps.js'


            ],
            dest: dest + '/js'
        },
        fonts: {
            src: [
                bower + '/fontawesome/fonts/*',
                bower + '/bootstrap/fonts/*'
            ],
            dest: dest + '/fonts'
        }
    }
};