import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";

export function sprite() {
   return app.gulp.src(app.path.src.sprite)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            "title": "SPRITE",
            "message": "Error: <%= error.message %>",
         })
      ))
      .pipe(svgmin({
         js2svg: {
            pretty: true,
            indent: 3,
         },
         plugins: [
            {
               name: "removeAttrs",
               params: "(fill|stroke|style)",
            }
         ]
      }))
      .pipe(app.plugins.replace("&gt;", ">"))
      .pipe(svgSprite({
         mode: {
            stack: {
               sprite: "../sprite.svg",
               example: app.isDev,
            }
         }
      }))
      .pipe(app.gulp.dest(app.path.build.images))
}