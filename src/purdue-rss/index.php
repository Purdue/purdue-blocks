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
            'url' => array(
                    'required' => false,
                    'type'     => 'string',
            ),
        ),				
        'callback' => 'feed_url_endpoint',
        'permission_callback' => function () {
            return true;
        }
    ) );
} );
function feed_url_endpoint($data){

    $dataUrl = $data->get_param( 'url' );
    $results=[];
    $rss = fetch_feed( $dataUrl );

	if ( is_wp_error( $rss ) ) {
		return '<div class="components-placeholder"><div class="notice notice-error"><strong>' . __( 'RSS Error:' ) . '</strong> ' . $rss->get_error_message() . '</div></div>';
	}

	if ( ! $rss->get_item_quantity() ) {
		return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, which probably means the feed is down. Try again later.' ) . '</div></div>';
	}
    $rss_items  = $rss->get_items( 0, 10);

    if(!empty($rss_items)){
        $id=0; 
       foreach ($rss_items as $item) {  
            $title = esc_html( trim( strip_tags( $item->get_title() ) ) );
            if ( empty( $title ) ) {
                $title = __( '(no title)' );
            }
            $link = $item->get_link();
            $link = esc_url( $link );
            $description = $item->get_description();
           $imgURLMatch = preg_match("/img.+?src=\"([^\"]+)\"/", $description, $matchimgURL);
           if($imgURLMatch){
               $imgURL=$matchimgURL[1];
           }else{
               $imgURL='';
           }
           $imgALTMatch = preg_match("/<img[^>]+alt=\"([^>]*)\"[^>]*>/iU", $description, $matchimgALT);
           if($imgALTMatch){
               $imgALT=$matchimgALT[1];
           }else{
               $imgALT='';
           }
           $text="";
           if(strlen(strip_tags($description))>0){
            $text=substr(strip_tags($description), 0, 300)."...";
           }
           $postDate = $item->get_date( 'U' );
           $date = date('M d, Y',strtotime($postDate));
           $month = date('M',strtotime($postDate));
           $day = date('d',strtotime($postDate));
           $node=array(
               'id'=>$id,
               'title'=>strval($title),
               'link'=>strval($link),
               'date'=>$date,
               'month'=>$month,
               'day'=>$day,
               'imgURL'=>$imgURL,
               'imgALT'=>$imgALT,
               'text'=>$text,
           );
           array_push($results, $node);
           ++$id;
       }	 
   }else{
    if(!$invalidurl){
        $results[error]="No item found";
    }
   }
    return json_encode($results);
}	