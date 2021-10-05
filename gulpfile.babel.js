import gulp from 'gulp';
import yargs from 'yargs';
const sass = require('gulp-sass')(require('sass'));
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import named from 'vinyl-named';


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
   scripts: {
      src: ['src/assets/js/bundle.js', 'src/assets/js/admin.js'], 
      dest:'dist/assets/js'
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
   gulp.watch('src/assets/js/**/*.js', scripts);
   gulp.watch(paths.images.src, images);
   gulp.watch(paths.other.src, copy);
}

export const copy = () =>{ //copy other file in asset folder to destination folder
   return gulp.src(paths.other.src)
         .pipe( gulp.dest(paths.other.dest) );
}

export const scripts = () => {
   return gulp.src( paths.scripts.src )
         .pipe(named())
         .pipe( webpack({
            mode: !PRODUCTION ? 'development' : 'production',  //minified if production
            module:{
               rules:[{                        //every single object is a rule here
                   test: /\.js$/,              //all js file
                   use: {
                       loader: 'babel-loader', //use babel loader
                       options: {
                           presets: ["@babel/preset-env"]       
                       }
                   }
               }]
           },
           output: {
              filename: '[name].js' //changing file output to bundle from main.js
           },
           devtool: !PRODUCTION ? 'inline-source-map' : false //using the filename of a code instead of the bundle one
         }) )
         .pipe( gulp.dest(paths.scripts.dest) )
}



//run series of task, run parrallel
export const dev = gulp.series( clean, gulp.parallel(styles, scripts, images, copy),  watch); //use for developing
export const build = gulp.series( clean, gulp.parallel(styles, scripts, images, copy) ); //build when finish in development

export default dev; //default task