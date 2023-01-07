import uglify from "gulp-uglify-es";
const uglifier = uglify.default;

export function jsVendors() {
   return app.gulp.src(`${app.path.src.js}/vendors/*.js`, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            "title": "JS",
            "message": "Error: <%= error.message %>",
         })
      ))
      .pipe(app.plugins.concat("vendors.min.js"))
      .pipe(app.plugins.if(
         app.isBuild,
         uglifier()
      ))
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browsersync.stream())
}