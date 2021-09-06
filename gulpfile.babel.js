import gulp from 'gulp';
import yargs from 'yargs';
const sass = require('gulp-sass')(require('sass'));
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';


const PRODUCTION = yargs.argv.prod;


const paths = {
   styles: {
      src: ['src/assets/scss/bundle.scss', 'src/assets/scss/admin.scss'],
      dest: 'dist/assets/css'
   },
   images: {
      src: 'src/assets/images/**/*.{jpg,jpeg,png,svg,gif}',
      dest: 'dist/assets/images'
   },
   other:{
      //@1stArgs - copy all file from subfolders of assets and its subdirectories
      //@2ndArgs - don't copy foler with named images, js, scss in src/assets
      //@3rdArgs - don't copy sub folders and files under images, js, scss folder
      src: ['src/assets/**/*', '!src/assets/{images,js,scss}', '!src/assets/{images,js,scss}/**/*'],
      dest: 'dist/assets'
   }
}

export const clean = () => del(['dist']); //clean dist folder

export const styles = () => {
   return gulp.src(paths.styles.src) //get file to optimize and add to distribution folder
         .pipe( gulpif(!PRODUCTION, sourcemaps.init()) ) //it initialize sourcemaps just load the actual source file if not production
         .pipe( sass().on('error', sass.logError) ) //checking error with sass
         .pipe( gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})) ) //if PRODUCTION is true then minified it
         .pipe( gulpif(!PRODUCTION, sourcemaps.write()) ) //giving permission to source maps to write in the above file and load the actual source file if not production
         .pipe( gulp.dest(paths.styles.dest) ); //brings the optimized codes to distribution folder
}

export const images = () =>{
   return gulp.src(paths.images.src) 
         .pipe( gulpif(PRODUCTION, imagemin()) ) //if production call imagemin 
         .pipe( gulp.dest(paths.images.dest) ); //optimized it to the destination folder
}

export const watch = () =>{ //watch is to load the file dynamically
   //add actions/task to watch here
   /**
    * 
    * @ - watch()
    * @1stArg - path
    * @2ndArg - task name
    */
   gulp.watch('src/assets/scss/**/*.scss', styles);
   gulp.watch(paths.images.src, images);
   gulp.watch(paths.other.src, copy);
}

export const copy = () =>{ //copy other file in asset folder to destination folder
   return gulp.src(paths.other.src)
         .pipe( gulp.dest(paths.other.dest) );
}

//run series of task, run parrallel
export const dev = gulp.series( clean, gulp.parallel(styles, images, copy),  watch); //use for developing
export const build = gulp.series( clean, gulp.parallel(styles, images, copy) ); //build when finish in development

export default dev; //default task