<?php
/**
 * Block Name: theme grouped post lists
 *
 * This is the template that displays the theme grouped post lists block.
 */

$terms = get_terms( array(
'taxonomy' => 'theme_tax',
'hide_empty' => false,
) );
if (function_exists('get_field')) {	
    $publication = get_field('publication')->slug;
    $filter = get_field('add_a_theme_filter')[0];
    $header = get_field('header');
    
}else{
    $publication = "";
    $filter = "";
    $header = "";
}
?>
<div id="ajax-load-more" class="print-publication-articles-themed">
    <?php if($header!=""){?>
    <div class="section container articles-heading">
        <h2 class="has-black-color has-text-color"><?php echo $header;?></h2>
    </div>
    <?php }?>
    <?php if(sizeof($terms)>0){?>
        <?php if($filter =="Yes"){?>
        <div class="container theme-filter-container has-background-grey-lighter">
            <div class="alm-filters-container">
                <div class="alm-filter filter">
                    <div class="alm-filter--select ">
                        <select class="alm-filter--item theme-selector" id="theme-selector">
                            <option value="#">Themes</option>
                            <?php foreach($terms as $term){
                
                                $args = array('post_type' => 'post',
                                'tax_query' => array(
                                    'relation' => 'AND',
                                    array(
                                        'taxonomy' => 'theme_tax',
                                        'field' => 'slug',
                                        'terms' => $term->slug,
                                        ),
                                    array(
                                        'taxonomy' => 'pub_tax',
                                        'field' => 'slug',
                                        'terms' => $publication,
                                        ),
                                    ),
                                );	
                                $loop = new WP_Query($args);		
                                if($loop->have_posts()) {

                                ?>							
                            <option value="<?php echo(isset( $term->name) ? str_replace(' ', '-', strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $term->name))) : '');?>">
                            <?php echo(isset( $term->name) ? $term->name : '');?>
                            </option>
                            <?php }
                            wp_reset_query();
                        }?>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <?php }?>
        <div class="section">
        <?php foreach($terms as $term){
            $args = array('post_type' => 'post',
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'theme_tax',
                    'field' => 'slug',
                    'terms' => $term->slug,
                    ),
                array(
                    'taxonomy' => 'pub_tax',
                    'field' => 'slug',
                    'terms' => $publication,
                    ),
                ),
            );	
            $loop = new WP_Query($args);		
            if($loop->have_posts()) {
            ?>
            <div id="<?php echo (str_replace(' ', '-', strtolower(preg_replace("/[^A-Za-z0-9 ]/", '', $term->name))));?>" class="container theme-group">
                <h3 class="theme-header"><?php echo(isset( $term->name) ? $term->name : '');?></h3>

                <?php if(isset($term->description)){?>
                <p class="theme-description has-black-color has-text-color"><?php echo($term->description);?></p>
                <?php }?>
                <?php

                if (is_plugin_active('ajax-load-more-pro/ajax-load-more-pro.php')) {
                    echo do_shortcode('[ajax_load_more theme_repeater="post-list-masonry.php" taxonomy="pub_tax:theme_tax" taxonomy_terms="'.$publication.':'.$term->slug.'" taxonomy_operator="IN:IN" filters_paging="false" post_type="post" posts_per_page="20" label="Load More" css_classes="post-list" transition="masonry" masonry_selector=".grid-item" masonry_animation="slide-up"]');
                }
                ?>
            </div>
        <?php }}?>
        </div>
    <?php }?>
</div>