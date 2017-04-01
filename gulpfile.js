const gulp = require('gulp')
const uglify = require('gulp-uglify')
const minifyCSS = require('gulp-csso')
const del = require('del')

gulp.task('clean', () => {
  return del(['dist'])
})

gulp.task('styles', () => {
  return gulp.src('src/style/*.css')
             .pipe(minifyCSS())
             .pipe(gulp.dest('dist/style'))
})

gulp.task('scripts', () => {
  return gulp.src('src/*.js')
             .pipe(uglify())
             .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('src/style/vue-toast.css', ['styles'])
  gulp.watch('src/toast.js', ['scripts'])
})

gulp.task('default', ['watch', 'clean', 'styles', 'scripts'])
