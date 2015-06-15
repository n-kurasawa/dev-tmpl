var gulp = require('gulp');
var plumber  = require('gulp-plumber')
var concat  = require('gulp-concat')
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var bowerFiles  = require('main-bower-files');

gulp.task('js', function() {
    return browserify({
        entries:['./src/jsx/App.jsx'],
        extensions:['js', 'jsx']
    })
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.log(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task ('vendor', function() {
    gulp.src(bowerFiles())
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch("src/jsx/**/*.jsx", ['js']);
  gulp.watch("src/jsx/**/*.js", ['js']);
  gulp.watch('bower_components/**/*.js', ['vendor']);
});

gulp.task('build', ['vendor', 'js']);
gulp.task('default', ['watch']);
