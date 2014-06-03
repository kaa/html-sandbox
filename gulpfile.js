// Run 'gulp' to do the important stuff
var  gulp = require('gulp')
	,prefixer = require('gulp-autoprefixer')
	,less = require('gulp-less')
	,path = require('path')
  ,concat = require('gulp-concat')
	,rename = require('gulp-rename')
	,connect = require('gulp-connect');

gulp.task('connect', function(){
  connect.server({
    root: "app",
    livereload: true
  })
});

gulp.task('less', function () {
  gulp
    .src('./all.less')
    .pipe(
      less({
        rootPath: 'style',
        paths: ['less'],
        sourceMap: true ,
        relativeUrls: true,
        x: true
      }).on("error", function(err) {
        console.error(err.message);
      })
    )
    .pipe(prefixer('last 2 versions', 'ie 9'))
    .pipe(gulp.dest('./app/style'))
    .pipe(connect.reload())
});

gulp.task('scripts', function() {
  return gulp
    .src(['./script/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload())
});

gulp.task('html', function(){
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

gulp.task('default', ['less','scripts','watch','connect']);
gulp.task('watch', function() {
  gulp.watch('./less/**/*.less', ['less']);
  gulp.watch('./scripts/**/*.js', ['scripts']);
  gulp.watch('./app/**/*.html', ['html']);
});