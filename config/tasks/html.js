import fileinclude from "gulp-file-include"
import version from "gulp-version-number";
import typograf from "gulp-typograf";
// import webphtml from "gulp-webp-html-nosvg";

// "gulp-webp": "^4.0.1",
// "gulp-webp-html-nosvg": "^1.1.1",
// "gulp-webpcss": "^1.1.1",

export function html() {
   return app.gulp.src(app.path.src.html)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            "title": "HTML",
            "message": "Error: <%= error.message %>",
         })
      ))
      .pipe(fileinclude({}))
      .pipe(typograf({ 
         locale: ['ru', 'en-US'],
         htmlEntity: { type: "name" },
      }))
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      .pipe(app.plugins.replace(/@resources\//g, "/"))
      .pipe(app.plugins.replace(/@temp\//g, "temp/"))
      .pipe(app.plugins.replace("NEW_PROJECT_NAME", `${app.path.rootFolder}`))
      // .pipe(webphtml())
      .pipe(app.plugins.if(
         app.isBuild,
         app.plugins.beautify.html({ indent_size: 3 })
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         version({
            "value": "%DT%",
            "append": {
               "key": "_v",
               "cover": 0,
               "to": ["css", "js"],
            },
            "output": {
               "file": "./config/version.json"
            }
         })
      ))
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
}