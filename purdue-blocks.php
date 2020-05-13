<?php
/**
 * Plugin Name: Purdue Blocks
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Purdue Blocks is a plugin used by Purdue Wordpress and Drupal sites to allow users to add Purdue's elements to pages.
 * Author: Purdue Marketing & Media
 * Author URI: https://brand.purdue.edu/
 * Version: 1.1.0
 * License: GPLv3+
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
