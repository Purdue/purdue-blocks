<?php
/**
 * Plugin Name: Purdue Blocks
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Adds Gutenberg blocks to Wordpress based on Purdue's brand elements.
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
