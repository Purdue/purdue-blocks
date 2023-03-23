<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
	
function render_block_purdue_gallery($attributes){
    $id=$attributes['id']!=""?' id="'.$attributes['id'].'"':"";
    $class=$attributes['hasBottomPadding']?"":" no-bottom-padding";
    $class.=$attributes['type']=="imageText"?" purdue-image-gallery--mixed pu-profile-gallery":"";
    $class.=$attributes['className']!=""?" ".$attributes['className']:"";
    $output.='<div'.$id.' class="purdue-image-gallery has-'.$attributes["background"].'-background section is-medium'.$class.'">';
    $output.='<div class="container">';
    if($attributes['header'] != ""){
        $output.='<h2 class="purdue-image-gallery__header align-'.$attributes['headerLocation'].'">'.$attributes['header'].'</h2>'; 
    }
    if($attributes['content'] != ""){
        $output.='<p class="purdue-image-gallery__content align-'.$attributes['contentAlign'].'">'.$attributes['content'].'</p>'; 
    }
    $column_class[] = 'column is-half-tablet is-full-mobile is-one-third-desktop';
    if(isset( $attributes['columns'] ) && $attributes['columns'] =="4" ){
        $column_class[] = 'is-one-quarter-widescreen';
    }else{
        $column_class[] = 'is-one-third-widescreen';
    }
    if($attributes['type'] == "image" && sizeof($attributes['imgs'])>0){
            $output.='<div class="columns is-multiline">';
            foreach ( $attributes['imgs'] as $img ) {  
                $output.='<div class="'.implode(' ',$column_class).'">';
                $image_class = 'image-gallery-open';
                if($img["caption"] =="" ){
                    $image_class.= ' image-no-caption';
                }
                $output.='<div class="'.$image_class.'" data-toggle="'.$img["id"].'">';
                $output.='<div class="image is-square" role="image" data-src="'.$img["url"].'" aria-label="'.$img["alt"].'"></div>';
                if($img["caption"] !="" ){
                    $output.='<button class="image-modal-button" aria-label="More information"><i class="fas fa-plus" aria-hidden="true"></i></button>';
                }
                $output.='</div>';
                if($img["caption"] !="" ){
                    $output.='<div class="image-modal-content" data-modal="'.$img["id"].'"><div class="image-modal-close"><p>'.$img["caption"].'</p></div>
                    <button class="image-modal-button" aria-label="close"><i class="fas fa-minus" aria-hidden="true"></i></button>
                    </div>';
                }
                $output.='</div>';

            }
            $output.='</div>';
    }elseif($attributes['type'] == "imageText" && sizeof($attributes['cards'])>0){
        $output.='<div class="columns is-multiline">';
        foreach ( $attributes['cards'] as $card ) {  
            $output.='<div class="'.implode(' ',$column_class).'">';
            $output.='<div class="image-container">';
            $image_class = 'profile-gallery-open';
            $output.='<div class="'.$image_class.'" data-toggle="'.$card["media_id"].'">';
            $output.='<div class="image is-square" role="image" data-src="'.$card["media_url"].'" aria-label="'.$card["media_alt"].'"></div>';
            $output.='<button class="modal-open-button" aria-label="More information"><i class="fas fa-plus" aria-hidden="true"></i></button>';
            $output.='</div>';
            $output.='<div class="pu-profile-gallery--modal" data-modal="'.$card["media_id"].'">
                <div class="modal--close-button"  aria-label="close">
                    <i class="fas fa-times" aria-hidden="true"></i>
                 </div>
                <div class="container">
                <figure class="full-image">
                <img class="image" src="'.$card["media_url"].'" alt="'.$card["media_alt"].'"/>
                <figcaption>'.$card["media_caption"].'</figcaption>
                </figure>
                </div>
            </div>';
            $output.='</div>';
            $output.='<div class="content-container">';
            $output.='<p>'.$card["subtext"].'</p>';
            $output.='</div>';
            $output.='</div>';
        }
        $output.='</div>';
    }
        $output.='</div></div>';
    return $output;
}

function register_block_purdue_gallery() {
  register_block_type(
    'purdue-blocks/image-gallery',
    array(
        'attributes' => array(
            'type' => array(
                "type" => "string",
                "default" => "image",
            ),
            'header' => array(
                "type" => "string",
                "default" => "",
            ),
            'background' => array(
                "type" => "string",
                "default" => "white",
            ),
            'headerLocation' => array(
                "type" => "string",
                "default" => "left",
            ),
            'content' => array(
                "type" => "string",
                "default" => "",
            ),
            'contentAlign' => array(
                "type" => "string",
                "default" => "left",
            ),
            'imageAlign' => array(
                "type" => "string",
                "default" => "left",
            ),
            "imgs" => array(
                "type"=> "array",
                "default"=> [],
            ),
            "cards" => array(
                "type"=> "array",
                "default"=> [],
            ),
            "columns" => array(
                "type"=> "string",
                "default"=> "3",
            ),
            "id" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "hasBottomPadding" => array(
                "type"=> "boolean",
                "default"=> true,
            ),
            "className" => array(
                "type"=> "string",
                "default"=> "",
            ),
        ),
        'render_callback' => 'render_block_purdue_gallery',
    )
  );
}
add_action( 'init', 'register_block_purdue_gallery' );