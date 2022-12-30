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
    }else{
        $column_class[] = 'is-one-third-desktop';
    }
    $column_class[] = 'is-half-tablet is-full-mobile';

    if($attributes['background'] != "" && $attributes['background'] == "white"){
        $output='<div'.$id.' class="purdue-link-cards has-white-background section is-medium">'; 
    }elseif($attributes['background'] != "" && $attributes['background'] == "black"){
        $output='<div'.$id.' class="purdue-link-cards has-black-background section is-medium">';
    }elseif($attributes['background'] != "" && $attributes['background'] == "gray"){
        $output='<div'.$id.' class="purdue-link-cards has-gray-background section is-medium">';
    }
    $output.='<div class="container">';
    if($attributes['header']){
        $output.='<h2 class="section-header align-'.$attributes['headerLocation'].'">';
        $output.=$attributes['header'];
        $output.='</h2>';
    }
    if(sizeof($attributes['tabs'])>0){
        $output.='<div class="columns is-multiline">';
            foreach ( $attributes['tabs'] as $key => $tab ) {  
                $target=$tab[newtab]?'target="_blank"':'target="_self"';
                $output.='<div class="'.implode(' ',$column_class).'">';
                if($tab[link] != ""){
                    $output.='<a class="card media link-card" href="'.$tab[link].'" '.$target.'>';
                }else{
                    $output.='<div class="card media link-card">';
                }
                        if($tab[media][url] != ""){
                            $output.='<div class="image is-16by9 background-image" role="img" style="background-image:url('.$tab[media][url].')" aria-label="'.$tab[media][alt].'"></div>';
                        }
                        $output.='<div class="media-content">';
                        $output.='<p class="title is-4">'.$tab[title].'</p>';                        
                        if($tab[subtext] != ""){
                            $output.='<p class="vertical-subtext">'.$tab[subtext].'</p>';
                        }
                        $output.='</div>';
                    if($tab[link] != ""){
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