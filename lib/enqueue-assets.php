<?php
/**
 * All scripts and styles are enqueued here in wp_head() or wp_enqueue()
 */

function jmsiteAssets(){
    //Styles
    wp_enqueue_style('jmsite-theme', THEME_URI.'/dist/assets/css/bundle.css', THEME_VERSION, array(), 'all');

    //Scripts
    wp_enqueue_script('jmsite-theme', THEME_URI.'/dist/assets/js/bundle.js', THEME_VERSION, array(), true);
}
add_action('wp_enqueue_scripts', 'jmsiteAssets');


/** Admin Assets */
function jmsite_adminAssets(){
    wp_enqueue_style('jmsite-admin', THEME_URI.'/dist/assets/css/admin.css', THEME_VERSION, array(), 'all');

    //Scripts
    wp_enqueue_script('jmsite-theme', THEME_URI.'/dist/assets/js/admin.js', THEME_VERSION, array(), true);
}
add_action('admin_enqueue_scripts', 'jmsite_adminAssets');