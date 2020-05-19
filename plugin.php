<?php
/**
 * Plugin Name: Purdue Blocks
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Purdue Blocks is a plugin used by Purdue Wordpress and Drupal sites to allow users to add Purdue's elements to pages.
 * Author: Purdue Marketing & Media
 * Author URI: https://www.purdue.edu/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
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

// Register post list custom Blocks
if ( function_exists( 'acf_register_block_type' ) ) {
    add_action('acf/init', 'my_register_blocks');
}

function my_register_blocks() {

	// check function exists.
	if( function_exists('acf_register_block_type') ) {

			// register a testimonial block.
			acf_register_block_type(array(
					'name'				=> 'theme-grouped-post-lists',
					'title'				=> __( 'Theme grouped post lists'),
					'description'		=> __( 'A block to add post lists grouped in themes.'),
					'render_template'   => dirname( __file__ ) . '/post-list-blocks/theme-posts.php',
					'category'			=> 'purdue-blocks',
					'icon'				=> 'feedback',
					'icon'              => array(
						// Specifying a background color to appear with the icon e.g.: in the inserter.
						'background' => '#fff',
						// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
						'foreground' => '#8e6f3e',
						// Specifying a dashicon for the block
						'src' => 'feedback',
					  ),
					'keywords'			=> array( 'post-list', 'theme' ),
            ));
            
	}
}
