<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
	
function render_block_purdue_gallery($attributes){
    $id=$attributes['id']!=""?' id="'.$attributes['id'].'"':"";
    $class=$attributes['hasBottomPadding']?"":" no-bottom-padding";
    $output.='<div'.$id.' class="purdue-image-gallery section is-medium'.$class.'">';
    $output.='<div class="container">';
    if($attributes['header'] != ""){
        $output.='<h2 class="purdue-image-gallery__header align-'.$attributes['headerLocation'].'">'.$attributes['header'].'</h2>'; 
    }
    if($attributes['content'] != ""){
        $output.='<p class="purdue-image-gallery__content align-'.$attributes['contentAlign'].'">'.$attributes['content'].'</p>'; 
    }
    if(sizeof($attributes['imgs'])>0){
            $output.='<div class="columns is-multiline">';
            $column_class[] = 'column is-half-tablet is-full-mobile';
            if(isset( $attributes['columns'] ) && $attributes['columns'] =="4" ){
                $column_class[] = 'is-one-quarter-desktop';
            }else{
                $column_class[] = 'is-one-third-desktop';
            }
            foreach ( $attributes['imgs'] as $img ) {  
                $output.='<div class="'.implode(' ',$column_class).'">';
                $image_class = 'image-gallery-open';
                if($img["caption"] =="" ){
                    $image_class.= ' image-no-caption';
                }
                $output.='<div class="'.$image_class.'" data-toggle="'.$img["id"].'">';
                $output.='<div class="image is-square" role="image" style="background-image: url('.$img["url"].');" aria-label="'.$img["alt"].'"></div>';
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
    }
        $output.='</div></div>';
    return $output;
}

function register_block_purdue_gallery() {
  register_block_type(
    'purdue-blocks/image-gallery',
    array(
        'attributes' => array(
            'header' => array(
                "type" => "string",
                "default" => "",
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
            "imgs" => array(
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
            
        ),
        'render_callback' => 'render_block_purdue_gallery',
    )
  );
}
add_action( 'init', 'register_block_purdue_gallery' );