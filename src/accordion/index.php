<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
//Had issues with the richtext and innerblocks content, could break the current blocks on the sites	
function render_block_accordion($attributes){
    $blockId=$attributes['inputId']!=""?' id="'.$attributes['inputId'].'"':"";

    $output='<div class="accordion" '.$blockId.'>';
    $output.='<'.$attributes['titleLevel'].' class="accordion-title" id="title-'.$attributes['id'].'" aria-controls="content-'.$attributes['id'].'" aria-expanded="false" role="button">';
    $output.=$attributes['title'];
    $output.='</'.$attributes['titleLevel'].'>';
    $output.='<div class="accordion-content" id="content-'.$attributes['id'].'">'.$content.'</div>';
    $output.='</div>';
    return $output;
}

function register_block_accordion() {
  register_block_type(
    'purdue-blocks/accordion',
    array(
        'attributes' => array(
            "id" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "inputId" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "title" => array(
                "type"=> "string",
                "source"=> 'html', 
                "selector"=> '.accordion-title',
                "default"=> "",
            ),
            'titleLevel' => array(
                "type" => "string",
                "default" => "p",
            ),
        ),
        'render_callback' => 'render_block_accordion',
    )
  );
}
add_action( 'init', 'register_block_accordion' );