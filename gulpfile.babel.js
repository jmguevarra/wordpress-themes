import gulp from 'gulp';
import yargs from 'yargs';
const sass = require('gulp-sass')(require('sass'));
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';


const PRODUCTION = yargs.argv.prod;

export const styles = () => {

   return gulp.src('src/assets/scss/bundle.scss') //get file to optimize and add to distribution folder
            .pipe( sass().on('error', sass.logError) ) //checking error with sass
            .pipe( gulpif(PRODUCTION, cleanCss({compatibility: 'ie8'})) ) //if PRODUCTION is true then minified it
            .pipe( gulp.dest('dist/assets/css') ) //brings the optimized codes to distribution folder
}

// export default styles;