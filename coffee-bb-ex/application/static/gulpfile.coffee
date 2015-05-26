gulp        = require 'gulp'
plumber     = require 'gulp-plumber'
concat      = require 'gulp-concat'
stylus      = require 'gulp-stylus'
jade        = require 'gulp-jade'
bowerFiles  = require 'main-bower-files'
source      = require 'vinyl-source-stream'
browserify  = require 'browserify'
nib         = require 'nib'

gulp.task 'js', ->
  browserify
    entries: ["./src/coffee/initialize.coffee"]
    extensions: ['.coffee','.jade', '.js']
  .transform 'coffeeify'
  .transform 'jadeify'
  .bundle()
  .on('error', (err)->
    console.log err
    @emit 'end'
  )
  .pipe source 'app.js'
  .pipe gulp.dest 'public/js'

gulp.task 'vendor', ->
    gulp.src(bowerFiles())
    .pipe plumber()
    .pipe concat 'vendor.js'
    .pipe gulp.dest 'public/js'

gulp.task 'css', ->
  gulp.src "./src/stylus/*.styl"
  .pipe plumber()
  .pipe stylus({use: [nib()]})
  .pipe gulp.dest 'public/css'

gulp.task 'html', ->
  gulp.src "./src/jade/**/*.jade", base: 'src/jade'
  .pipe jade
      pretty: true
  .pipe plumber()
  .pipe gulp.dest 'public'

gulp.task 'watch', ['build'], ->
  gulp.watch "src/coffee/**/*.coffee", ['js']
  gulp.watch "src/coffee/template/**/*.jade", ['js']
  gulp.watch "src/stylus/**/*.styl", ['css']
  gulp.watch "src/jade/**/*.jade", ['html']
  gulp.watch 'bower_components/**/*.js', ['vendor']

gulp.task 'build', ['vendor', 'js', 'css', 'html']
gulp.task 'default', ['watch']
