import gulp from 'gulp';
import yargs from 'yargs';
const sass = require('gulp-sass')(require('sass'));
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';


const PRODUCTION = yargs.argv.prod;


const paths = {
   styles: {
      src: ['src/assets/scss/bundle.scss', 'src/assets/scss/admin.scss'],
      dest: 'dist/assets/css'
   }
}

export const styles = () => {
   return gulp.src(paths.styles.src) //get file to optimize and add to distribution folder
         .pipe( gulpif(!PRODUCTION, sourcemaps.init()) ) //it initialize sourcemaps just load the actual source file if not production
         .pipe( sass().on('error', sass.logError) ) //checking error with sass
         .pipe( gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})) ) //if PRODUCTION is true then minified it
         .pipe( gulpif(!PRODUCTION, sourcemaps.write()) ) //giving permission to source maps to write in the above file and load the actual source file if not production
         .pipe( gulp.dest(paths.styles.dest) ) //brings the optimized codes to distribution folder
}

export const watch = () =>{
   gulp.watch('src/assets/scss/**/*.scss', styles);
}
// export default styles;