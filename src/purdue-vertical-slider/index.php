<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
	
function render_block_purdue_vertical_slider($attributes){
    $id=$attributes['id']!=""?' id="'.$attributes['id'].'"':"";
    if($attributes['background'] != "" && $attributes['background'] == "white"){
        $output='<div'.$id.' class="purdue-slider-vertical has-white-background section is-medium">'; 
    }elseif($attributes['background'] != "" && $attributes['background'] == "black"){
        $output='<div'.$id.' class="purdue-slider-vertical has-black-background section is-medium">';
    }elseif($attributes['background'] != "" && $attributes['background'] == "gray"){
        $output='<div'.$id.' class="purdue-slider-vertical has-gray-background section is-medium">';
    }
    $output.='<div class="container">';
    if(sizeof($attributes['tabs'])>0){
            $output.='<div class="vertical-slides-container">';
            // var_dump($attributes['tabs']);
            foreach ( $attributes['tabs'] as $key => $tab ) {  
                $activeSlide = $key==0 ? " active":"";
                $output.='<div class="vertical-slide'.$activeSlide.'">';
                    $output.='<div class="columns">';
                        if($tab["media"]["url"] != ""){
                            $backgroundRole=$tab["media"]["url"]?' role="img" ':'';
                            $output.='<div class="column is-7-desktop image-column">';
                            $output.='<div class="image background-image"'.$backgroundRole.'style="background-image:url('.$tab["media"]["url"].')" aria-label="'.$tab["media"]["alt"].'"></div>';
                            $output.='</div>';
                        }
                        $output.='<div class="column content">';
                        $output.='<div class="content-wrap">';
                        $output.='<h2 class="title">'.$tab["header"].'</h2>';
                        
                        if($tab["subtext"] != ""){
                            $output.='<p class="subtext">'.$tab["subtext"].'</p>';
                        }
                        if($tab["buttonLink"] != ""){
                            $target=$tab["newtab"]?'targe="_blank"':'targe="_self"';
                            $output.='<a class="purdue-blocks__button purdue-blocks__button--gold-light" href="'.$tab["buttonLink"].'" '.$target.'>'.$tab["buttonLabel"].'</a>';
                        }
                        $output.='</div></div>';
                    $output.='</div>';
                $output.='</div>';
            }
          
            $output.='</div>';
            $output.='<div class="slider-bullets">';
            foreach ( $attributes['tabs'] as $key => $tab ) {  
                $active = $key==0 ? " active":"";
                $num = $key + 1;
                $output.='<button class="slider-bullet'.$active.'" aria-label="slide '.$num.'"></button>';
            }  
            $output.='</div>';
        }
        $output.='</div></div>';

    return $output;
}

function register_block_purdue_vertical_slider() {
  register_block_type(
    'purdue-blocks/purdue-vertical-slider',
    array(
        'attributes' => array(
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
        ),
        'render_callback' => 'render_block_purdue_vertical_slider',
    )
  );
}
add_action( 'init', 'register_block_purdue_vertical_slider' );