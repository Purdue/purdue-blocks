<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
	
function render_block_rtb_cards($attributes){
    $id=$attributes['id']!=""?' id="'.$attributes['id'].'"':"";
    if($attributes['background'] != "" && $attributes['background'] == "white"){
        $output='<div'.$id.' class="purdue-rtb-card-container has-white-background section is-medium">'; 
    }elseif($attributes['background'] != "" && $attributes['background'] == "black"){
        $output='<div'.$id.' class="purdue-rtb-card-container has-black-background section is-medium">';
    }elseif($attributes['background'] != "" && $attributes['background'] == "gray"){
        $output='<div'.$id.' class="purdue-rtb-card-container has-gray-background section is-medium">';
    }
    $output.='<div class="container">';
    if($attributes['header']){
        $output.='<h2 class="section-header align-'.$attributes['headerLocation'].'">';
        $output.=$attributes['header'];
        $output.='</h2>';
    }
if(sizeof($attributes['rtb'])>0){
            if($attributes['divider']){
                $output.='<div class="columns has-divider">';    
            }else{
                $output.='<div class="columns">';  
            }          
            foreach ( $attributes['rtb'] as $rtb ) { 
                $column_class[] = 'column';
                if ( isset( $attributes['columns'] ) && ! empty( $attributes['columns'] ) && $attributes['columns'] != "auto" ) {
                    if ( $attributes['columns'] == "2" ) {
                        $column_class[] = 'is-half-desktop is-half-tablet is-full-mobile';
                    }elseif ( $attributes['columns'] == "3" ) {
                        $column_class[] = 'is-one-third-desktop is-half-tablet is-full-mobile';
                    }elseif ( $attributes['columns'] == "4" ) {
                        $column_class[] = 'is-one-quarter-desktop is-half-tablet is-full-mobile';
                    }elseif ( $attributes['columns'] == "5" ) {
                        $column_class[] = 'is-one-fifth-desktop is-half-tablet is-full-mobile';
                    }elseif ( $attributes['columns'] == "6" ) {
                        $column_class[] = 'is-one-sixth-desktop is-half-tablet is-full-mobile';
                    }

                }
                $output.='<div class="'.implode( ' ', $column_class ).'">';
                $hasLead=$rtb['hasLead']?" pu-proofpoint__has-lead":"";
                $output.='<div class="pu-proofpoint'.$hasLead.'"><div class="container">';
                if($rtb[leadText] != "" && $rtb['hasLead']){
                    $output.='<span class="lead-text pu-proofpoint__lead">'.$rtb[leadText].'</span>';
                }
                if($rtb[largeText] != ""){
                    $output.='<span class="large-text pu-proofpoint__highlighted">'.$rtb[largeText].'</span>';
                }
                if($rtb[smallText] != ""){
                    $output.='<span class="small-text pu-proofpoint__content">'.$rtb[smallText].'</span>';
                }
                if($rtb[source] != ""){
                    $output.='<span class="source pu-proofpoint__source">'.$rtb[source].'</span>';
                }
                if($rtb[ctaLink] != ""){
                    $target=$tab[external]?'targe="_blank"':'targe="_self"';
                    $buttonClass= $attributes['background'] == "black"?" purdue-blocks__button--gold-dark":" purdue-blocks__button--gold-light";
                    $output.='<a class="pu-proofpoint__button purdue-blocks__button'.$buttonClass.'" href="'.$rtb[ctaLink].'" '.$target.'>'.$rtb[ctaText].'</a>';
                }
                $output.='</div></div></div>';
            }
            $output.='</div>';
        }
        $output.='</div></div>';
    return $output;
}

function register_block_rtb_cards() {
  register_block_type(
    'purdue-blocks/rtb-cards',
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
            "rtb" => array(
              "type"=> "array",
              "default"=> [],
            ),
            "divider" => array(
                "type"=> "boolean",
                "default"=> false,
            ),
            "columns" => array(
                "type"=> "string",
                "default"=> "3",
            ),
            "id" => array(
                "type"=> "string",
                "default"=> "",
            ),
        ),
        'render_callback' => 'render_block_rtb_cards',
    )
  );
}
add_action( 'init', 'register_block_rtb_cards' );