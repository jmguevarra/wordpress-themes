<?php
/**
 * All scripts and styles are enqueued here in wp_head() or wp_enqueue()
 */

function jmsiteAssets(){
    wp_enqueue_style('jmsite-theme', THEME_URI.'/dist/assets/css/bundle.css', THEME_VERSION, array(), 'all');
}

add_action('wp_enqueue_scripts', 'jmsiteAssets');