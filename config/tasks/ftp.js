import { ftpSetting } from "../settings/path.js";
import vinylFTP from "vinyl-ftp"
import util from "gulp-util";

export function ftp() {
   ftpSetting.log = util.log;
   const connection = vinylFTP.create(ftpSetting);
   return app.gulp.src(`${app.path.buildFolder}/**/*.*`)      
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            "title": "FTP",
            "message": "Error: <%= error.message %>",
         })
      ))
      .pipe(connection.dest(`/${app.path.ftp}/${app.path.rootFolder.toLowerCase()}`));
}