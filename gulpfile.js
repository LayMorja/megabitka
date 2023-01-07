//* Подключение самого gulp'a
import gulp from "gulp";
//* Подключение списка плагинов
import { plugins } from "./config/settings/plugins.js";
//* Подключение путей
import { path } from "./config/settings/path.js";

//* Глобальная переменная для доступа отовсюду
global.app = {
   isDev: !process.argv.includes("--build"),
   isBuild: process.argv.includes("--build"),
	isRewrite: process.argv.includes('--rewrite'),
   gulp,
   path,
   plugins
}

//* Импорт задач
import { reset } from "./config/tasks/reset.js";
import { css } from "./config/tasks/css.js";
import { html } from "./config/tasks/html.js"
import { server } from "./config/tasks/server.js";
import { images } from "./config/tasks/images.js";
import { js } from "./config/tasks/js.js";
import { jsVendors } from "./config/tasks/js-vendors.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./config/tasks/fonts.js";
import { resources } from "./config/tasks/resources.js";
import { sprite } from "./config/tasks/sprite.js";
import { temp } from "./config/tasks/temp.js";
import { zip } from "./config/tasks/zip.js";
import { ftp } from "./config/tasks/ftp.js";

//* Слежка за изменениями
function watcher() {
   gulp.watch(`${path.watch.styles}`, css);
   gulp.watch(`${path.watch.html}`, html);
   gulp.watch(`${path.watch.images}`, images);
   gulp.watch(`${path.watch.js}`, js);
   gulp.watch(`${path.watch.jsVendors}`, jsVendors);
   gulp.watch(`${path.watch.resources}`, resources);
   gulp.watch(`${path.watch.sprite}`, sprite);
   gulp.watch(`${path.watch.temp}`, temp);
}

//* Сценарии выполнения
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

const buildTasks = gulp.series(fonts, gulp.parallel(html, css, js, images, resources, sprite));
const cmsTasks = gulp.series(fonts, gulp.parallel(html, css, js, jsVendors, images, temp, resources, sprite));

const dev = gulp.series(reset, buildTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, buildTasks);
const bulidZip = gulp.series(build, zip);
const buildFTP = gulp.series(build, ftp);

const cmsDev = gulp.series(reset, cmsTasks, gulp.parallel(watcher, server));
const cmsBuild = gulp.series(reset, cmsTasks);
const cmsZip = gulp.series(cmsBuild, zip);
const cmsFTP = gulp.series(cmsBuild, ftp);

//* Экспорт задач
export { reset };
export { css };
export { html };
export { server };
export { images };
export { js };
export { fonts };
export { jsVendors };
export { resources };
export { sprite };
export { temp };

//* Экспорт сценариев выполнения
export { buildTasks };
export { cmsTasks };
export { dev };
export { build };
export { bulidZip };
export { buildFTP };
export { cmsDev };
export { cmsBuild };
export { cmsZip };
export { cmsFTP };

//* Сценарий по умолчанию (Gulp)
gulp.task('default', dev);