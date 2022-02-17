<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
	
function render_block_purdue_news($attributes){
    $results=[];

    $rss = fetch_feed( $attributes['feedURL'] );

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
            if(strlen(strip_tags(preg_replace('/<figure[^>]*>.*?<\/figure>/i', ' ', $description)))>0){
            $text=substr(strip_tags(preg_replace('/<figure[^>]*>.*?<\/figure>/i', ' ', $description)), 0, 300)."...";
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
    }

    $output='<div class="news-feed">';
    $output.='<div class="container">';
    if($attributes['header']){
        $output.='<'.$attributes['headerLevel'].' class="feed-header">'.$attributes['header'].'</'.$attributes['headerLevel'].'>';
    }

    if(!empty($results)){
        if($attributes['type']=="withImage"){
            $output.='<div class="columns is-multiline feed-items">';
            for($i=0;$i<3;$i++) {  
                $output.='<div class="column is-one-third-desktop is-one-third-tablet is-full-mobile"><div class="card feed-item">';
                $output.='<a href="'.$results[$i]["link"].'" target="_blank" rel="noopener noreferrer">';
                if($results[$i]["imgURL"]){
                    $output.='<div class="card-bg-image image is-2by1" role="img" style="background-image: url('.$results[$i]["imgURL"].')" aria-label="'.$results[$i]["imgALT"].'"></div>';
                }
                $output.='<div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">'.$results[$i]["title"].'</p>
                                </div>
                            </div>
                            <div class="read-more-button">
                                <span>Read More</span>
                            </div>
                          </div>';
                $output.='</a></div></div>';
            }
            $output.='</div>';
            if($attributes['hasLink']){
                $attributes['external']?$external="blank":$external="self";
                $output.='<div class="read-more-button"><a href="'.$attributes['link'].'" target="_'.$external.'" rel="noopener noreferrer">'.$attributes['linkText'].'</a></div>';
            }
        }elseif($attributes['type']=="withoutImage"){
            $output.='<div class="feed-grid">';
            if($attributes['imgUrl']){
                $output.='<figure class="feed-image is-3by2"><img src="'.$attributes['imgUrl'].'" alt="'.$attributes['altText'].'"></figure>';
            }
            $output.='<div class="feed-items">';
            for($i=0;$i<4;$i++) { 
                $output.='<div class="feed-item-noimage">';
                $output.='<a class="meida feed-item-noimage" href="'.$results[$i]["link"].'" target="_blank" rel="noopener noreferrer">';
                $output.='<div class="media-left">
                            <p class="month">'.$results[$i]["month"].'</p>
                            <p class="day">'.$results[$i]["day"].'</p>
                          </div>';
                $output.='<div class="media-content">
                            <div class="content">
                                <p class="title">'.$results[$i]["title"].'</p>
                                <p class="desc">'.$results[$i]["text"].'</p>
                            </div>
                          </div>';
                $output.='</a></div>';
            }
            $output.='</div>';
            if($attributes['hasLink']){
                $attributes['external']?$external="blank":$external="self";
                $output.='<a class="button" href="'.$attributes['link'].'" target="_'.$external.'" rel="noopener noreferrer">'.$attributes['linkText'].'</a>';
            }
            $output.='</div></div>';
        }else{
            $output.='<div class="columns is-multiline feed-items">';
            foreach($results as $result){
                $output.='<div class="column is-one-third-desktop is-half-tablet is-full-mobile"><div class="card feed-item">';
                $output.='<a href="'.$result["link"].'" target="_blank" rel="noopener noreferrer">';
                if($result["imgURL"]){
                    $output.='<div class="card-bg-image image is-2by1" role="img" style="background-image: url('.$result["imgURL"].')" aria-label="'.$result["imgALT"].'"></div>';
                }
                $output.='<div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="subtitle">'.$result["date"].'</p>
                                    <p class="title is-4">'.$result["title"].'</p>
                                </div>
                            </div>
                            <div class="content-text">'.$result["text"].'</div>
                            <div class="read-more-button">
                                <span>Read More</span>
                            </div>
                          </div>';
                $output.='</a></div></div>';
            }
            $output.='</div>';
        }
    }
    $output.='</div></div>';
    return $output;
}

function register_block_purdue_news() {
  register_block_type(
    'purdue-blocks/purdue-news',
    array(
        'attributes' => array(
            'type' => array(
                "type" => "string",
                "default" => "withImage",
            ),
            "feedURL" => array(
              "type"=> "string",
              "default"=> "",
            ),
            "header" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "headerLevel" => array(
                "type"=> "string",
                "default"=> "p",
            ),
            "hasLink" => array(
                "type"=> "boolean",
                "default"=> false,
            ),
            "link" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "linkText" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "imgUrl" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "altText" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "external" => array(
                "type"=> "boolean",
                "default"=> false,
            ),
        ),
        'render_callback' => 'render_block_purdue_news',
    )
  );
}
add_action( 'init', 'register_block_purdue_news' );