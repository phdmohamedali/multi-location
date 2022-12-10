<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://www.techspawn.com
 * @since      1.0.0
 *
 * @package    Wcmlim
 * @subpackage Wcmlim/admin/partials
 */
?>
<div class="wrap">
  <h1><?php esc_html_e('WooCommerce Multi Locations Inventory Management', 'wcmlim'); ?></h1>
  <?php 
  settings_errors();
  
    ?>
    <div class="admin-menu-setting-wcmlim">
      <div class="tabset">
        <input type="radio" name="tabset" id="tab1" aria-controls="1" checked>
        <label for="tab1">
          <?php esc_html_e('Location', 'wcmlim'); ?>
        </label>
        <input type="radio" name="tabset" id="tab2" aria-controls="2">
        <label for="tab2">
          <?php esc_html_e('General', 'wcmlim'); ?>
        </label>
        <input type="radio" name="tabset" id="tab3" aria-controls="3">
        <label for="tab3">
          <?php esc_html_e('Shop Page', 'wcmlim'); ?>
        </label>
        <input type="radio" name="tabset" id="tab4" aria-controls="4">
        <label for="tab4">
          <?php esc_html_e('Shipping and Payment Method', 'wcmlim'); ?>
        </label>
        <input type="radio" name="tabset" id="tab5" aria-controls="5">
        <label for="tab5">
          <?php esc_html_e('Notice Messages', 'wcmlim'); ?>
        </label>
        <input type="radio" name="tabset" id="tab6" aria-controls="6">
        <label for="tab6">
          <?php esc_html_e('Shortcodes & Documentation ', 'wcmlim'); ?>
        </label>
       
        <div class="tab-panels">
          <section id="1" class="tab-panel">
            <form action="options.php" method="post" id="location_setting_form">
              <?php
              settings_fields($this->plugin_name . '_location_shortcode_settings');
              do_settings_sections($this->plugin_name . '_location_shortcode_settings');
              submit_button();
              ?>
            </form>
          </section>
          <section id="2" class="tab-panel">
            <form action="options.php" method="post" id="general_setting_form">
              <?php
              settings_fields($this->plugin_name);
              do_settings_sections($this->plugin_name);
              submit_button();
              ?>
            </form>
          </section>
          <section id="3" class="tab-panel">
            <form action="options.php" method="post" id="shop_page_setting_form">
              <?php
              settings_fields($this->plugin_name . '_product_shop_page_settings');
              do_settings_sections($this->plugin_name . '_product_shop_page_settings');
              submit_button();
              ?>
            </form>
          </section>
          <section id="4" class="tab-panel">
            <form action="options.php" method="post" id="shipnd_pay_setting_form">
              <?php
              settings_fields($this->plugin_name . '_shipping_zone_method_settings');
              do_settings_sections($this->plugin_name . '_shipping_zone_method_settings');
              submit_button();
              ?>
            </form>
          </section>
          <section id="5" class="tab-panel">
            <form action="options.php" method="post" id="custom_notice_setting_form">
              <?php          
              settings_fields($this->plugin_name . '_custom_notice');
              do_settings_sections($this->plugin_name . '_custom_notice');
              submit_button();
              ?>
            </form>
          </section>
          <section id="6" class="tab-panel">
            <form action="options.php" method="post" id="shortcodes_setting_form">
              <div class="shortcode-instruction-block" style="width: 98%;">
                <h3>Location Popup </h3>
                To display Location Popup <br /> - use<code>[wcmlim_locations_popup]</code> or insert as PHP code into your theme files: <code> &lt;?php echo do_shortcode('[wcmlim_locations_popup]'); ?&gt;</code>
                <hr><h3>Location Switch</h3>
                To display Locations Dropdown on your website <br /> - use<code>[wcmlim_locations_switch]</code> shortcode.<br>You can put it anywhere into page content using editor just by copy-paste, <br> or insert as PHP code into your theme files: <code>&lt;?php echo do_shortcode('[wcmlim_locations_switch]'); ?&gt;</code>.   
              </div> 
              <?php
              settings_fields($this->plugin_name . '_shortcode_setting');
              do_settings_sections($this->plugin_name . '_shortcode_setting');
              submit_button();
              ?>
            </form>
            <div class="shortcode-instruction-block" style="width: 98%;">
                <h3>Other Shortcode details </h3>
                <hr>
                <h3>WooCommerce Locationwise Products</h3>
                The WooCommerce <code>[products]</code> shortcode is one of our most robust shortcodes, you can use the WooCommerce shortcode to showcase products by location <br /> - use
                <code>
                  [products limit="8" location_id="30" columns="4" orderby="id" order="ASC"]
                </code> or insert as PHP code into your theme files: 
                <code>
                   &lt;?php echo do_shortcode('[products limit="8" location_id="30" columns="4" orderby="id" order="ASC"]');?&gt;
                </code>
                Make sure you are passing location id. Eg. <strong>location_id = 1</strong>
                <hr><h3>Location Finder Map</h3>
                To display Location finder on map <br /> - use<code>[wcmlim_location_finder]</code> or insert as PHP code into your theme files: <code> &lt;?php echo do_shortcode('[wcmlim_location_finder]');?&gt;</code>
                <a href="admin.php?page=wcmlim-map-settings"> click here to see more option</a>
                <hr><h3>Location Finder List</h3>
                To display Location finder List View <br /> - use<code>[wcmlim_location_finder_list_view]</code> or insert as PHP code into your theme files: <code> &lt;?php echo do_shortcode('[wcmlim_location_finder_list_view]'); ?&gt;</code>
                <hr><h3>Location Info</h3>
                To display Location info <br /> - use<code>[wcmlim_location_info id=1]</code> or insert as PHP code into your theme files: <code> &lt;?php echo do_shortcode('[wcmlim_location_info id=1]'); ?&gt;</code> Make sure you are passing location id. Eg. <strong>id = 1</strong>
              </div>
          </section>
        </div>
      </div>
    </div>
