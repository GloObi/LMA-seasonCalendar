<?php
/**
 * Plugin Name: seasonCalendar-dependencies
 */


function include_seasonCalendar() {
    // wp_enqueue_style('calendar_css', plugin_dir_url(__FILE__).'app.css');
    // wp_enqueue_style('ycalendar_css', plugin_dir_url(__FILE__).'js-year-calendar.css');
    wp_enqueue_style('ycalendar_css', plugin_dir_url(__FILE__).'bootstrap.min.css');

    // wp_enqueue_script('calendar_js', plugin_dir_url(__FILE__).'js-year-calendar.fr.js');
    // wp_enqueue_script('calendar_js', plugin_dir_url(__FILE__).'jquery.min.js');
    // wp_enqueue_script('calendar_js', plugin_dir_url(__FILE__).'popper.min.js');
    wp_enqueue_script('calendar_js', plugin_dir_url(__FILE__).'bootstrap.min.js');
    // wp_enqueue_script('calendar_js', plugin_dir_url(__FILE__).'bootstrap-datepicker.min.js');
    // wp_enqueue_script('calendar_js', plugin_dir_url(__FILE__).'calendar.js');
    // wp_enqueue_script('myCalendar_js', plugin_dir_url(__FILE__).'myJs.js');
}


add_action('wp_enqueue_scripts', 'include_seasonCalendar');


?>

