import beautify from "gulp-beautify";
import browserSync from "browser-sync";
import concat from "gulp-concat";
import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
import rename from "gulp-rename";
import gulpIf from "gulp-if";
const browsersync = browserSync.create();

export const plugins = {
   concat,
   beautify,
   browsersync,
   replace,
   plumber,
   notify,
   newer,
   rename,
   if: gulpIf
}