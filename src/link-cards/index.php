<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
	
function render_block_link_cards($attributes){
    $id=$attributes['id']!=""?' id="'.$attributes['id'].'"':"";
    $column_class[] = 'column is-half-tablet is-full-mobile';
    if(isset( $attributes['columns'] ) && $attributes['columns'] =="4" ){
        $column_class[] = 'is-one-quarter-desktop';
    }elseif($attributes['columns'] =="3"){
        $column_class[] = 'is-one-third-desktop';
    }
    $block_class='purdue-link-cards has-'.$attributes["background"].'-background section is-medium';
    if($attributes['type'] != "" && $attributes['type'] == "regular"){
        $block_class.=' purdue-link-cards--regular';
    }elseif($attributes['type'] != "" && $attributes['type'] == "simple"){
        $block_class.=' purdue-link-cards--simple';
    }
    $output='<div'.$id.' class="'.$block_class.'">';
    $output.='<div class="container">';
    if($attributes['header']){
        $output.='<h2 class="section-header align-'.$attributes['headerLocation'].'">';
        $output.=$attributes['header'];
        $output.='</h2>';
    }
    if(sizeof($attributes['tabs'])>0){
        $output.='<div class="columns is-multiline">';
            foreach ( $attributes['tabs'] as $key => $tab ) {  
                $target=$tab["newtab"]?'target="_blank"':'target="_self"';
                $output.='<div class="'.implode(' ',$column_class).'">';
                if($tab["link"] != ""){
                    $output.='<a class="card media link-card" href="'.$tab["link"].'" '.$target.'>';
                }else{
                    $output.='<div class="card media link-card">';
                }
                        if($tab["media"]["url"] != ""){
                            $backgroundRole=$tab["media"]["url"]?' role="img" ':'';
                            $output.='<div class="image is-16by9 background-image"'.$backgroundRole.'style="background-image:url('.$tab["media"]["url"].')" aria-label="'.$tab["media"]["url"].'"></div>';
                        }
                        $output.='<div class="media-content">';
                        if($tab["mediaType"] != ""){
                            $svg="";
                            if($tab["mediaType"] == "article"){
                                $svg='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper" class="svg-inline--fa fa-newspaper fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"></path></svg>';
                            }elseif($tab["mediaType"] == "podcast"){
                                $svg='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="headphones" class="svg-inline--fa fa-headphones fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z"></path></svg>';
                            }else{
                                $svg='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video" class="svg-inline--fa fa-video fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"></path></svg>';
                            }
                            $output.='<p class="media-type">'.$svg.'<span>'.$tab["mediaType"].'</span></p>';
                        }
                        if($tab["date"] != ""){
                            $output.='<p class="story-date">'.$tab["date"].'</p>';
                        }
                        $output.='<p class="title is-4">'.$tab["title"].'</p>';                        
                        if($tab["subtext"] != ""){
                            $output.='<p class="vertical-subtext">'.$tab["subtext"].'</p>';
                        }
                        if($tab["buttontext"] != ""){
                            $output.='<div class="purdue-blocks__button purdue-blocks__button--gold-light">'.$tab["buttontext"].'</div>';
                        }
                        $output.='</div>';
                    if($tab["link"] != ""){
                    $output.='</a>';
                    }else{
                        $output.='</div>';
                    }
                $output.='</div>';
            }
            $output.='</div>';
        }
        $output.='</div></div>';

    return $output;
}

function register_block_link_cards() {
  register_block_type(
    'purdue-blocks/link-cards',
    array(
        'attributes' => array(
            "type" => array(
                "type"=> "string",
                "default"=> "compact",
            ),
            "header" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "headerLocation" => array(
                "type"=> "string",
                "default"=> "left",
            ),
            'background' => array(
                "type" => "string",
                "default" => "white",
            ),
            "tabs" => array(
                "type"=> "array",
                "default"=> [],
            ),
            "id" => array(
                "type"=> "string",
                "default"=> "",
            ),
            'columns'           => [
				'type'    => 'string',
				'default' => '3',
			],
        ),
        'render_callback' => 'render_block_link_cards',
    )
  );
}
add_action( 'init', 'register_block_link_cards' );