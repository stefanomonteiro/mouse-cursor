<?php

/**
 * 
 * Plugin Name: sm Mouse Cursor
 * Plugin URI: https://stefanomonteiro.com/wp-plugins
 * Author: Stefano Monteiro
 * Author URI: https://stefanomonteiro.com
 * Version: 1.0.0
 * Description: Adds a custom mouse cursor
 * Text Domain: sm_
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Basic security, prevents file from being loaded directly.
defined('ABSPATH') or die('Cheatin&#8217; uh?');


if (!function_exists('add_sm_mouse_cursor')) {
 function add_sm_mouse_cursor(){
     echo '<div class="sm-cursor gsap-autoAlpha--cursor"><div class="sm-cursor--inner"></div></div>';
 }
} 
add_action('wp_footer', 'add_sm_mouse_cursor');



if (!function_exists('enqueue_sm_mouse_cursor')) {
    function enqueue_sm_mouse_cursor()
    {
        if (!wp_style_is('sm_mouse_cursor-css', 'enqueued')) {
            wp_enqueue_style('sm_mouse_cursor-css', plugin_dir_url(__FILE__) . 'css/sm_mouse_cursor.css', [], time());
        }
        if (!wp_script_is('sm_mouse_cursor-js', 'enqueued')) {
            wp_enqueue_script('sm_mouse_cursor-js', plugin_dir_url(__FILE__) . 'js/sm_mouse_cursor.js', [], time(), true);
        }
    }
}
add_action('wp_enqueue_scripts', 'enqueue_sm_mouse_cursor', 100);
