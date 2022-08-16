<?php
/**
 * Server-side rendering of the `news` block.
 *
 * @package WordPress
 */
	
function render_block_purdue_slider($attributes){
    if($attributes['background'] != "" && $attributes['background'] == "white"){
        $output.='<div class="purdue-slider has-white-background section is-medium">'; 
    }elseif($attributes['background'] != "" && $attributes['background'] == "black"){
        $output.='<div class="purdue-slider has-black-background section is-medium">';
    }elseif($attributes['background'] != "" && $attributes['background'] == "gray"){
        $output.='<div class="purdue-slider has-gray-background section is-medium">';
    }
    $output.='<div class="container">';
    if($attributes['header'] != "" && $attributes['headerLevel'] != ""){
        $output.='<'.$attributes['headerLevel'].' class="purdue-slider__header align-'.$attributes['headerLocation'].'">'.$attributes['header'].'</'.$attributes['headerLevel'].'>'; 
    }
        if($attributes['type']=="slider" && sizeof($attributes['cards'])>0){
            $output.='<div class="glide purdue-slider--default">';            
            $output.='<div class="glide__track" data-glide-el="track">';
            $output.='<div class="glide__slides">';
            foreach ( $attributes['cards'] as $card ) {  
                if($card[ctaLink] != ""){
                    $target=$card[external]?'targe="_blank"':'targe="_self"';
                    $output.='<a class="glide__slide card" href="'.$card[ctaLink].'" '.$target.'>';
                    if($card[imageURL] != ""){
                        $output.='<div class="image is-2by1 background-image" role="img" style="background-image:url('.$card[imageURL].')" aria-label="'.$card[imageAlt].'"></div>';
                    }
                    $output.='<div class="content">';
                    if($card[storyType] != ""){
                        $output.='<p class="story-type">'.$card[storyType].'</p>';
                    }
                    $output.='<p class="story-title">'.$card[header].'</p>';
                    $output.='<div class="read-more purdue-blocks__button purdue-blocks__button--gold-light purdue-blocks__button--outline"><span>'.$card[ctaText].'</span></div>';
                    if($card[tag] != ""){
                        $output.='<p class="story-tag">'.$card[tag].'</p>';
                    }
                    $output.='</div></a>';
                }else{
                    $output.='<div class="glide__slide card">';
                    if($card[imageURL] != ""){
                        $output.='<div class="image is-2by1 background-image" role="img" style="background-image:url('.$card[imageURL].')" aria-label="'.$card[imageAlt].'"></div>';
                    }
                    $output.='<div class="content>';
                    if($card[storyType] != ""){
                        $output.='<p class="story-type">'.$card[storyType].'</p>';
                    }
                    $output.='<p class="story-title">'.$card[header].'</p>';
                    if($card[tag] != ""){
                        $output.='<p class="story-tag">'.$card[tag].'</p>';
                    }
                    $output.='</div></div>';
                }
            }
            $output.='</div></div>';
            $output.='<div class="glide__bullets" data-glide-el="controls[nav]">';
            foreach ( $attributes['cards'] as $key => $card ) {  
                $output.='<button class="glide__bullet" data-glide-dir="='.$key.'"></button>';
            }
            $output.='</div>';
            $output.='<div class="glide__arrows" data-glide-el="controls">
                        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                        <button class="glide__arrow glide__arrow--right" data-glide-dir="&#62;">next</button>';
            $output.='</div></div>';

        }elseif($attributes['type']=="tabs" && sizeof($attributes['tabs'])>0){
            $output.='<div class="glide purdue-slider--tabs">';            
            $output.='<div class="glide__track" data-glide-el="track">';
            $output.='<div class="glide__slides">';
            // var_dump($attributes['tabs']);
            foreach ( $attributes['tabs'] as $tab ) {  
                $output.='<div class="glide__slide columns">';
                if($tab[imageURL] != ""){
                    $output.='<div class="column image-column">';
                    $output.='<div class="image background-image" role="img" style="background-image:url('.$tab[imageURL].')" aria-label="'.$tab[imageAlt].'"></div>';
                    $output.='</div>';
                }
                $output.='<div class="content column">';
                $output.='<p class="title">'.$tab[header].'</p>';
                
                if($tab[subtext] != ""){
                    $output.='<p class="subtext">'.$tab[subtext].'</p>';
                }
                if($tab[ctaLink] != ""){
                    $target=$tab[external]?'targe="_blank"':'targe="_self"';
                    $output.='<a class="purdue-blocks__button purdue-blocks__button--gold-light" href="'.$tab[ctaLink].'" '.$target.'>'.$tab[ctaText].'</a>';
                }
                $output.='</div></div>';
            }
            $output.='</div></div>';
            $output.='<div class="glide__bullets" data-glide-el="controls[nav]">';
            foreach ( $attributes['tabs'] as $key => $tab ) {  
                $output.='<button class="glide__bullet" data-glide-dir="='.$key.'"></button>';
            }            
            $output.='</div>';
            $output.='<div class="glide__arrows" data-glide-el="controls">
                        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                        <button class="glide__arrow glide__arrow--right" data-glide-dir="&#62;">next</button>';
            $output.='</div></div>';
        }elseif($attributes['type']=="rtb" && sizeof($attributes['rtb'])>0){
            $output.='<div class="glide purdue-slider--rtb">';            
            $output.='<div class="glide__track" data-glide-el="track">';
            $output.='<div class="glide__slides">';
            foreach ( $attributes['rtb'] as $rtb ) {  
                $output.='<div class="glide__slide"><div class="pu-proofpoint"><div class="container">';
                if($rtb[largeText] != ""){
                    $output.='<p class="large-text pu-proofpoint__highlighted">'.$rtb[largeText].'</p>';
                }
                if($rtb[smallText] != ""){
                    $output.='<p class="small-text pu-proofpoint__content">'.$rtb[smallText].'</p>';
                }
                if($rtb[source] != ""){
                    $output.='<p class="source pu-proofpoint__source">'.$rtb[source].'</p>';
                }
                if($rtb[ctaLink] != ""){
                    $target=$tab[external]?'targe="_blank"':'targe="_self"';
                    $output.='<a class="pu-proofpoint__button" href="'.$rtb[ctaLink].'" '.$target.'>'.$rtb[ctaText].'</a>';
                }
                $output.='</div></div></div>';
            }
            $output.='</div></div>';
            $output.='<div class="glide__bullets" data-glide-el="controls[nav]">';
            foreach ( $attributes['rtb'] as $key => $rtb ) {  
                $output.='<button class="glide__bullet" data-glide-dir="='.$key.'"></button>';
            }
            $output.='</div>';
            $output.='<div class="glide__arrows" data-glide-el="controls">
                        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                        <button class="glide__arrow glide__arrow--right" data-glide-dir="&#62;">next</button>';
            $output.='</div></div>';
        }
        if($attributes['hasLink'] != "" && $attributes['linkUrl'] != ""){
            $buttonTarget=$attributes[external]?'targe="_blank"':'targe="_self"';
            $output.='<a class="purdue-slider__button purdue-blocks__button" href="'.$attributes['linkUrl'].'" '.$buttonTarget.'>'.$attributes['linkText'].'</a>'; 
        }
        $output.='</div></div>';
    return $output;
}

function register_block_purdue_slider() {
  register_block_type(
    'purdue-blocks/purdue-slider',
    array(
        'attributes' => array(
            'type' => array(
                "type" => "string",
                "default" => "slider",
            ),
            'background' => array(
                "type" => "string",
                "default" => "white",
            ),
            'header' => array(
                "type" => "string",
                "default" => "",
            ),
            'headerLevel' => array(
                "type" => "string",
                "default" => "h2",
            ),
            'headerLocation' => array(
                "type" => "string",
                "default" => "left",
            ),
            "hasLink" => array(
                "type"=> "boolean",
                "default"=> false,
            ),
            'linkText' => array(
                "type" => "string",
                "default" => "",
            ),
            'linkUrl' => array(
                "type" => "string",
                "default" => "",
            ),
            "cards" => array(
              "type"=> "array",
              "default"=> [],
            ),
            "tabs" => array(
                "type"=> "array",
                "default"=> [],
            ),
            "rtb" => array(
                "type"=> "array",
                "default"=> [],
            ),
        ),
        'render_callback' => 'render_block_purdue_slider',
    )
  );
}
add_action( 'init', 'register_block_purdue_slider' );