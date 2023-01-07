import imagemin from "gulp-imagemin";

export function temp() {
   return app.gulp.src(app.path.src.temp)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            "title": "TEMP",
            "message": "Error: <%= error.message %>",
         })
      ))
      .pipe(app.plugins.newer(app.path.build.temp))
      .pipe(app.plugins.if(
         app.isBuild,
         imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3,
         })
      ))
      .pipe(app.gulp.dest(app.path.build.temp))
      .pipe(app.gulp.src(app.path.src.tempSvg))
      .pipe(app.gulp.dest(app.path.build.temp))
      .pipe(app.plugins.browsersync.stream())
}