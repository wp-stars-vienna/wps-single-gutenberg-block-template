<?php

/*
  Plugin Name: WPS Block Library Plugin
  Version: 1.0
  Author: WP-Stars
  Author URI: https://github.com/LearnWebCode
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class WPSMainBlock {
  function __construct() {
    add_action('init', array($this, 'onInit'));
  }

  function onInit() {
    wp_register_script('mainBlockScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_register_style('mainBlockStyle', plugin_dir_url(__FILE__) . 'build/index.css');
    
    register_block_type('wpsblocks/wps-main-block', array(
      'render_callback' => array($this, 'renderCallback'),
      'editor_script' => 'mainBlockScript',
      'editor_style' => 'mainBlockStyle'
    ));
  }

  function renderCallback($attributes) {
    if (!is_admin()) {
      wp_enqueue_script('mainBlockFrontendScript', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
      wp_enqueue_style('mainBlockFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
    }

    ob_start(); 
    $posts = get_posts(
      array(
        'post__in' => $attributes['posts']
      )
    );
    $attributes['post_objects'] = $posts;
    ?>
    <div class="mainblock-update-me"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
    <?php return ob_get_clean();
    
  }

  function renderCallbackBasic($attributes) {
    return '<div class="mainblock-frontend">Hello, the sky is ' . $attributes['skyColor'] . ' and the grass is ' . $attributes['grassColor'] . '.</div>';
  }
}

$WPSMainBlock = new WPSMainBlock();