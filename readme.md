## Wordpress Workflow with Gulp

1. Install NPM then init it in your theme project
2. Install Gulp with given instruction [here:](https://gulpjs.com/docs/en/getting-started/quick-start) 
3. Install Babel JS in gulp file checkout [here:](https://github.com/gulpjs/gulp) 
4. Add yargs for gulp helper follow instruction [here:](https://www.npmjs.com/package/yargs)
5. Add gulp sass to compile gulp styles/scripts [here:](https://www.npmjs.com/package/gulp-sass)
6. Add clean gulp css [here:](https://www.npmjs.com/package/gulp-clean-css)
7. Add gulp if to add certain condition in pipe
8. Install gulp sourcemaps at [here](https://www.npmjs.com/package/gulp-sourcemaps). It shows the exact css/js file of a code instead of the bundled file.
9. Optimized images with gulp imagemin [here](https://www.npmjs.com/package/gulp-imagemin)
10. Install del npm package [here](https://www.npmjs.com/package/del)
11. Install Webpack Stream [here](https://www.npmjs.com/package/webpack-stream)
12. Adding BrowserSync install it with this document [here](https://browsersync.io/).




## Notes
for Scripts Libraries. Check first if the library is already in wordpress core and you can use it instead of adding new one using there own handle. [here](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)
```php
    wp_enqueue_script('jquery'); //adding jquery libary
```


## Bundling for Production
This is packaging all necessary files in one zip file to install in wordpress.

