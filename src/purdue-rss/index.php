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
        'callback' => 'feed_url_endpoint',
        'permission_callback' => function () {
            return true;
        }
    ) );
} );
function feed_url_endpoint($data){

    $results=[];
    $invalidurl = false;
    if(@simplexml_load_file($data['url'])){
        $rss = simplexml_load_file($data['url']);
    }else{
        $invalidurl = true;
        $results[error]="Invalid RSS feed URL.";
    }
    if(!empty($rss)){
        $id=0; 
       foreach ($rss->channel->item as $item) {  
           $title = $item->title;
           $link = $item->link;
           $description = $item->description;
           $imgURLMatch = preg_match("/img src=\"([^\"]+)\"/", $description, $matchimgURL);
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
           $postDate = $item->pubDate;
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