<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */

add_action( 'rest_api_init', function () {

    $route_settings = array(
        'path' => 'purduerssfeed/v2',
        'name' => '/getFeed/'
    );

    register_rest_route( $route_settings['path'], $route_settings['name'], array(
        'methods' => 'GET',
        'args' => array(
            'url'
        ),				
        'callback' => 'feed_url_endpoint'
    ) );
} );
function feed_url_endpoint($data){
    $c = curl_init();
    curl_setopt($c, CURLOPT_URL, $data['url']);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($c);
    return wp_send_json($result);
}	