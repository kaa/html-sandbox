// Run 'gulp' to do the important stuff
var  gulp = require('gulp')
    ,watch = require('gulp-watch')
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

gulp.task('less', function() {
  return gulp
    .src('./less/all.less')
    .pipe(less({
      rootPath: 'style',
      paths: ['less'],
      sourceMap: true ,
      relativeUrls: true,
      x: true
    }).on("error", function(err) {
      console.error(err.message);
    }))
    .pipe(gulp.dest('./app/style'))
    .pipe(connect.reload())
});

gulp.task('scripts', function() {
  return gulp
    .src(['./scripts/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/scripts'))
    .pipe(connect.reload())
});

gulp.task('html', function(){
  return gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  watch({ glob: 'less/**/*.less'  }, ['less']   );
  watch({ glob: 'scripts/**/*.js' }, ['scripts']);
  watch({ glob: 'app/**/*.html'   }, ['html']   );
});

gulp.task('default', ['less', 'scripts', 'watch', 'connect']);
