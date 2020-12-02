<?php
/**
 * Server-side rendering of the `custom side menu` block.
 *
 * @package WordPress
 */

function render_block_custom_side_menu($attributes){
    if($attributes['selectedMenu']){
        $menus_items = wp_get_nav_menu_items($attributes['selectedMenu']);
        if($menus_items&&!empty($menus_items)){
            $menu_list='<div class="custom-side-menu">';
            $menu_list.='<ul class="custom-side-menu-top">';
            $count = 0;
            $submenu = false;
            $cpi=get_the_id();
            foreach ( $menus_items as $menu_item ) {
                $link = $menu_item->url;
                $title = $menu_item->title;
                if ( !$menu_item->menu_item_parent ) {
                    $parent_id = $menu_item->ID;
                    $menu_list.='<li class="custom-side-menu-item">';
                    if($cpi == $menu_item->object_id ){
                        $menu_list.='<a class="is-active" href="'.$link.'">'.$title.'</a>';
                    }else{
                        $menu_list.='<a href="'.$link.'">'.$title.'</a>';
                    }
                }
                if ( $menu_item->menu_item_parent ) {
                    $parent_id == $menu_item->menu_item_parent;
                    if ( !$submenu ) {
                        $submenu = true;
                        $menu_list .= '<ul class="custom-side-menu-item-submenu">';
                    }
        
                    $menu_list .= '<li class="custom-side-menu-item-subitem">';
                    if($cpi == $menu_item->object_id ){
                        $menu_list.='<a class="is-active" href="'.$link.'">'.$title.'</a>';
                    }else{
                        $menu_list.='<a href="'.$link.'">'.$title.'</a>';
                    }
                    $menu_list .= '</li>';
                    if ( empty($menus_items[$count + 1]) || $menus_items[ $count + 1 ]->menu_item_parent != $parent_id && $submenu ){
                        $menu_list .= '</ul>';
                        $submenu = false;
                    }
        
                }
                if ( empty($menus_items[$count + 1]) || $menus_items[ $count + 1 ]->menu_item_parent != $parent_id ) { 
                    $menu_list .= '</li>';      
                    $submenu = false;
                }
                $count++;
            }
            $menu_list.='</ul>';
            if($attributes['toTop']){
                $menu_list.='<button id="to-top-sidebar" class="to-top-sidebar"><span class="text">Back To Top</span></button>';
            }else{
                $menu_list.='<div class="to-top-sidebar"></div>';
            }
            $menu_list.='</div>';
        }else{
            $menu_list='<div class="custom-side-menu-empty-message">
            Select a menu from the right panel
            </div>';
        }

    }else{
        $menu_list='<div class="custom-side-menu-empty-message">
        Select a menu from the right panel
        </div>';
    }
   
    return $menu_list;
}

function register_block_custom_side_menu() {
  register_block_type(
    'purdue-blocks/custom-side-menu',
    array(
        'attributes' => array(
            'menus' => array(
                "type" => "array",
                "default" => [],
            ),
            "selectedMenu" => array(
                "type"=> "string",
                "default"=> "",
            ),
            "toTop" => array(
                "type"=> "boolean",
                "default"=> false,
            ),
        ),
        'render_callback' => 'render_block_custom_side_menu',
    )
  );
}
add_action( 'init', 'register_block_custom_side_menu' );	