//gulp 2015-02-27
/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */
'use strict';

var gulp = require('gulp');

var g = require('gulp-load-plugins')({lazy: false}),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var config = {
    paths: {
        html: {
            src:  ["src/**/*.html"],
            dest: "build"
        },
        js: {
            src:  ["src/app/**/*.js"],
            dest: "build/js"
        },
        css: {
            src: ["src/assets/**/*.css"],
            dest: "build/css"
        },
        assets: {
            src: ["src/assets/**/*.png", "src/assets/**/*.jpg"],
            dest: "build/assets"
        }
    }
}

// Watch Files For Changes & Reload
gulp.task('default', function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['src']
  });

  gulp.watch(config.paths.html.src, reload);
  gulp.watch(config.paths.css.src,reload, ['inject']);
  gulp.watch(config.paths.js.src, ['inject']);
  gulp.watch(config.paths.assets.src, reload);
});

// inject css js
gulp.task('inject', function(){
  return gulp.src('./src/index.html')
    .pipe(g.inject(gulp.src('./src/app/**/*.js', {read: false}), {relative: true}))
    .pipe(g.inject(gulp.src('./src/assets/css/*.css', {read: false}), {relative: true}))
    .pipe(gulp.dest('./src'));
})


 /**
 * Dist
 */

 // 检查脚本
gulp.task('jscheck', function() {
    gulp.src(config.paths.js.src)
        .pipe(g.jshint())
        .pipe(g.jshint.reporter('default'));
});

// 合并，压缩js文件
gulp.task('minjs', function() {
    gulp.src(config.paths.js.src)
        .pipe(g.concat('app.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(g.rename('app.min.js'))
        .pipe(g.uglify())
        .pipe(gulp.dest('./dist'));
});

// 合并，压缩css文件
gulp.task('mincss', function() {
    gulp.src(config.paths.js.src)
        .pipe(g.concat('app.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(g.rename('app.min.css'))
        .pipe(g.cssmin())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('dist', function(){
    gulp.run('jscheck', 'minjs', 'mincss');
});