<?php
/**
 * All scripts and styles are enqueued here in wp_head() or wp_enqueue()
 */

function jmsiteEnqueue(){
    //Styles
    wp_enqueue_style('jmsite-theme', THEME_URI.'/dist/assets/css/bundle.css', THEME_VERSION, array(), 'all');

    //Scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script('jmsite-theme', THEME_URI.'/dist/assets/js/bundle.js', THEME_VERSION, array(), true);
}
add_action('wp_enqueue_scripts', 'jmsiteEnqueue');


/** Admin Assets */
function jmsite_adminEnqueue(){
    wp_enqueue_style('jmsite-admin', THEME_URI.'/dist/assets/css/admin.css', THEME_VERSION, array(), 'all');

    //Scripts
    wp_enqueue_script('jmsite-theme', THEME_URI.'/dist/assets/js/admin.js', THEME_VERSION, array(), true);
}
add_action('admin_enqueue_scripts', 'jmsite_adminEnqueue');