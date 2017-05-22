/* File: gulpfile.js */

 var gulp        = require('gulp');
 var browserSync = require('browser-sync').create();
 //var watch = require('gulp-watch');
 // Static server
 gulp.task('serve', function() {
     browserSync.init({
         port: 8080,
         server: {
             baseDir: "./Web"   //"./"
         }
     });
 });

 // or...
/*
//Alternative static server
 gulp.task('browser-sync', function() {
     browserSync.init({
         proxy: "yourlocal.dev"
     });
 });
 */


/*
//Process JS files and rerun the stream
 gulp.task('js', function(){
    gutil.log("js is being minified");
    return gulp.src('js/*.js')
           .pipe(browserify())
           .pipe(uglify())
           .pipe(gulp.dest('dist/js'));
 });

 //create a task that ensure the 'js' tasks is complete before
 //reloading browsers
 gulp.task('serve', ['js'], function(){
    //Serve files from the root of this project
    gutil.log("js files are completed, refresh");
    browserSync.init({
        server: {
            baseDir : "./"
        }
    });
 });
*/




 gulp.task('default', ['serve'], function(){
     gulp.watch('Web/*.html').on('change', browserSync.reload);
     gulp.watch('*.html').on('change', browserSync.reload);
 });














/*
Old example
//grap our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util');

 //create a default task and just log a message
 gulp.task('default', function(){
    return gutil.log('Gulp is running!');
 });
 */
