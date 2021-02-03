<?php

/**
 * Plugin Name: Purdue Blocks
 * Plugin URI: https://github.com/purdue/purdue-blocks/
 * Description: Adds Gutenberg blocks to Wordpress based on Purdue's brand elements.
 * Author: Purdue Marketing and Media
 * Author URI: https://brand.purdue.edu/digital/
 * Version: 1.15.2
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Block Initializer.
 */

require_once plugin_dir_path(__FILE__) . 'src/init.php';
require_once plugin_dir_path(__FILE__) . 'src/purdue-rss/index.php';
require_once plugin_dir_path(__FILE__) . 'src/purdue-news/index.php';
require_once plugin_dir_path(__FILE__) . 'src/custom-side-menu/index.php';

// Register post list custom Blocks
if (function_exists('acf_register_block_type')) {
  add_action('acf/init', 'my_register_blocks');
}

function my_register_blocks()
{

  // check function exists.
  if (function_exists('acf_register_block_type')) {

    // register a testimonial block.
    acf_register_block_type(array(
      'name'        => 'theme-grouped-post-lists',
      'title'        => __('Theme grouped post lists'),
      'description'    => __('A block to add post lists grouped in themes.'),
      'render_template'   => dirname(__file__) . '/post-list-blocks/theme-posts.php',
      'category'      => 'purdue-blocks',
      'icon'        => 'feedback',
      'icon'              => array(
        // Specifying a background color to appear with the icon e.g.: in the inserter.
        'background' => '#fff',
        // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
        'foreground' => '#8e6f3e',
        // Specifying a dashicon for the block
        'src' => 'feedback',
      ),
      'keywords'      => array('post-list', 'theme'),
    ));
  }
}


