const gulp = require("gulp");
const inline = require("gulp-inline");

gulp.task("default", () => {
  return gulp
    .src("./dist/ng-snip-overlay/browser/*/*.html")
    .pipe(inline())
    .pipe(gulp.dest("./single-dist"));
});