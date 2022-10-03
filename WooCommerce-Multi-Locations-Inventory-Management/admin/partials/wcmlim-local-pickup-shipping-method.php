<?php
function wcmlim_local_shipping_init()
{
 
  if (!class_exists('Wcmlim_Pickup_Shipping_Method')) {

    class Wcmlim_Pickup_Shipping_Method extends WC_Shipping_Method
    {
      /**
       * Constructor.
       *
       * @param int $instance_id
       */
      public function __construct($instance_id = 0)
      {
        
        $this->id = 'wcmlim_pickup_location';
        $this->instance_id = absint($instance_id);
        $this->method_title = __("Pickup Location", 'wcmlim');
        $this->supports = array(
          'shipping-zones',
          'instance-settings',
          'instance-settings-modal',
        );
        $this->init();
      }

      /**
       * Initialize custom shiping method.
       */
      public function init()
      {

        // Load the settings.
        $this->init_form_fields();
        $this->init_settings();

        // Define user set variables
        $this->title = $this->get_option('title');

        // Actions
        
        add_action('woocommerce_update_options_shipping_' . $this->id, array($this, 'process_admin_options'));
      }

      /**
       * Calculate custom shipping method.
       *
       * @param array $package
       *
       * @return void
       */
      public function calculate_shipping($package = array())
      {
        $this->add_rate(array(
          'label' => $this->title,
          'package' => $package,
        ));
      }

      /**
       * Init form fields.
       */
      public function init_form_fields()
      {
        $this->instance_form_fields = array(
          'title' => array(
            'title' => __('Pickup Location', 'wcmlim'),
            'type' => 'text',
            'description' => __('This controls the title which the user sees during checkout.', 'woocommerce'),
            'default' => __('Pickup Location', 'wcmlim'),
            'desc_tip' => true,
          ),
        );
      }
    }
  }
}
// show address in below local-pickup selection on checkout page -codeinit
// add_action('woocommerce_review_order_before_payment', 'details');
function details($pickup_location_term)
  {
    if(get_option('wcmlim_allow_local_pickup') == 'on' && get_option('wcmlim_allow_only_backend') == 'on'){
    ?>
    <p class="local_pickup_address"></p>
    <?php
    }
    if(get_option('wcmlim_allow_local_pickup') == 'on' && get_option('wcmlim_allow_only_backend') != 'on'){
      ?>
      <p class="local_pickup_address"></p>
      <?php
      }
  }
// show address in below local-pickup selection on checkout page -codeend

// ajax call back and hook to show local pickup address on checkout page -codeinit
add_action('wp_ajax_show_address',  'wcmlim_show_address_on_checkout');
add_action('wp_ajax_nopriv_show_address', 'wcmlim_show_address_on_checkout');
function wcmlim_show_address_on_checkout()
    {
      $term_id = sanitize_text_field($_POST['location_id']);
      $terms = get_terms(array('taxonomy' => 'locations', 'hide_empty' => false, 'parent' => 0));
      foreach ($terms as $key => $term) {
        if ($term_id == $term->term_id) {
          $street_address = get_term_meta(
            $term_id,
            'wcmlim_street_number',
            true
          );
          $city = get_term_meta($term_id, 'wcmlim_route', true);
          $postcode = get_term_meta($term_id, 'wcmlim_postal_code', true);
          $state = get_term_meta(
            $term_id,
            'wcmlim_administrative_area_level_1',
            true
          );
          $state = ucwords($state);
          $country_state = get_term_meta(
            $term_id,
            'wcmlim_country',
            true
          );
          $email = get_term_meta($term_id, 'wcmlim_email', true);
          $phone = get_term_meta($term_id, 'wcmlim_phone', true);
          $term_meta = array(
            'street_address' => $street_address,
            'wcmlim_city' => $city,
            'wcmlim_postcode' => $postcode,
            'wcmlim_state_code' => $wcmlim_state_code,
            'wcmlim_state' => $state,
            'wcmlim_country_state' => $country_state,
            'wcmlim_email' => $email,
            'wcmlim_phone' => $phone,
          );
          echo json_encode($term_meta);
          die();

        }
      }
      

    }
// ajax call back and hook to show local pickup address on checkout page -codeend


add_action('woocommerce_shipping_init', 'wcmlim_local_shipping_init');

function wcmlim_local_shipping_method($methods)
{
  $methods['wcmlim_pickup_location'] = 'Wcmlim_Pickup_Shipping_Method';

  return $methods;
}
add_filter('woocommerce_shipping_methods', 'wcmlim_local_shipping_method');


/**
 * Set message on cart page
 * @version 1.6.1
 */

function wcmlim_wc_cart_totals_before_order_total()
{
  
  if (is_wcmlim_chosen_shipping_method()) {

    // load the contents of the cart into an array.
    global $woocommerce;
    $cart_message = '';
    $cart = $woocommerce->cart->cart_contents;
    
    

    $pickup_valid = get_option('wcmlim_pickup_valid');
    
     if (in_array('local-pickup-for-woocommerce/local-pickup.php', apply_filters('active_plugins', get_option('active_plugins'))) ||  is_array(get_site_option('active_sitewide_plugins')) && !array_key_exists('local-pickup-for-woocommerce/local-pickup.php', get_site_option('active_sitewide_plugins'))) 
        {
          update_option($this->option_name . '_allow_local_pickup','');
        }
        
    // loop through the array looking for the tag you set. Switch to true if the tag is     found.
    if (get_option('wcmlim_allow_local_pickup') == 'on' && get_option('wcmlim_allow_only_backend') != 'on') {
      $locAdd = array();
      $pickupAdd = array();
      
	  foreach ($cart as $array_item) {       
        if (isset($array_item['select_location']['location_name'])) {
          $terms = get_terms(array('taxonomy' => 'locations', 'hide_empty' => false, 'parent' => 0));         
          foreach ($terms as $term) {
            if ($term->name == $array_item['select_location']['location_name']) {
              $term_id = $term->term_id;
              $streetNumber = get_term_meta($term_id, 'wcmlim_street_number', true);
              $route = get_term_meta($term_id, 'wcmlim_route', true);
              $locality = get_term_meta($term_id, 'wcmlim_locality', true);
              $state = get_term_meta($term_id, 'wcmlim_administrative_area_level_1', true);
              $postal_code = get_term_meta($term_id, 'wcmlim_postal_code', true);
              $country = get_term_meta($term_id, 'wcmlim_country', true);
			  $pickup = get_term_meta($term_id, 'wcmlim_allow_pickup', true);
			  $isClearCart = get_option('wcmlim_clear_cart');
              $arrayloc = $streetNumber . " " . $locality . " " . $state . " " . $route;
              
              if(!in_array( $arrayloc, $locAdd ) && $pickup == "on")
              {
                if($streetNumber != null ) { 
					$streetNumber = $streetNumber . " ,";
				  } else {
					$streetNumber = '';
				  }
				  if($route != null ) { 
					$route = $route . " ,"; 
				  } else {
					$route = '';
				  }
				   if($locality != null ) { 
					$locality = $locality . " ,"; 
				  } else {
					$locality = '';
				  }
					 if($state != null ) { 
					$state = $state . " ,";
				  } else {
					$state = '';
				  }
					if($postal_code != null ) { 
					$postal_code = $postal_code . " ,";
				  } else {
					$postal_code = '';
				  }
				   if($country != null ) { 
					$country = $country;
				  } else {
					$country = '';
				  }
				  $cart_message .= "Pickup Address : " . $streetNumber . " " . $route . " " . $locality . " "  . $state . " " . $postal_code . " " . $country . "<br/>";
				  array_push( $locAdd, $arrayloc );
				  $pickup_add = false; 
				  array_push( $pickupAdd, $pickup_add );
              }
			  else if(!in_array( $arrayloc, $locAdd ) && $pickup == null && $isClearCart == false ) 
              {     
				$pickup_add = true;  
				// wc_add_notice( $term->name . " " . $pickup_valid . " ", 'error' );                         
				$cart_message .= $term->name . " " . $pickup_valid . "<br>"; 
				array_push( $pickupAdd, $pickup_add );
				array_push( $locAdd, $arrayloc );
              }
              else if(!in_array( $arrayloc, $locAdd ) && $pickup == null && $isClearCart != false )
              {     
				// $pickup_add = false; 
				// array_push( $pickupAdd, $pickup_add );   
        // wc_add_notice( $term->name . " " . $pickup_valid . " ", 'error' );                         
				// $cart_message .= $term->name . " " . $pickup_valid . "<br>"; 
				// array_push( $locAdd, $arrayloc );
				// echo "<script language='javascript'>
				// jQuery( document ).ready(function($) {
				// $('#place_order').hide(); 
				// $('.checkout-button').hide(); 
				// });
				// </script>";
              }			 
			
            } 
          } 
		
        }
      }
	 
	  // if(count(array_unique($pickupAdd)) === 1 && $isClearCart == false )  {
		// echo "<script language='javascript'>
		// jQuery( document ).ready(function($) {
		//   $('#place_order').hide(); 
		//   $('.checkout-button').hide(); 
		// });
		// </script>";
		// } 

      if (!empty($cart_message)) {
?>
        <!-- <tr class="shipping-pickup-store">
          <td colspan="2">
            <p class="message"><?= $cart_message ?></p>
          </td>
        </tr> -->
      <?php
      }
      
    } elseif (get_option('wcmlim_allow_only_backend') == 'on') {
      $cart_message = 'Locations for pickup your order are available on the Checkout page.';
      if (!empty($cart_message)) {
      ?>
        <tr class="shipping-pickup-store">
          <td colspan="2">
            <p class="message"><?= $cart_message ?></p>
          </td>
        </tr>
      <?php
      }
    }
    
  }
}
add_action('woocommerce_cart_totals_before_order_total', 'wcmlim_wc_cart_totals_before_order_total');


/**
 * Get chosen shipping method
 */
function wcmlim_get_chosen_shipping_method()
{
  $chosen_methods = WC()->session->get('chosen_shipping_methods');

  return $chosen_methods[0];
}

/**
 * Check is chosen shipping is wcmlim_local_shipping
 * @version 1.6.1
 * @return bool True is chosen shipping is wcmlim_local_shipping
 */
function is_wcmlim_chosen_shipping_method()
{
  $chosen_shipping = wcmlim_get_chosen_shipping_method();
  $chosen_shipping = explode(":", $chosen_shipping);
  if ($chosen_shipping[0] == "wcmlim_pickup_location") {
    return true;
  }
}

/**
 ** Returns the main instance for wcmlim_local_shipping class
 **/
function wcmlim()
{
  return new Wcmlim_Pickup_Shipping_Method();
}

/**
 * Store table row layout
 */
function wcmlim_location_row_layout()
{
  if (is_wcmlim_chosen_shipping_method()) {
    // load the contents of the cart into an array.
    global $woocommerce;
    $cart_message = '';
    $cart = $woocommerce->cart->cart_contents;
    $pickup_valid = get_option('wcmlim_pickup_valid');

    if (get_option('wcmlim_allow_local_pickup') == 'on' && get_option('wcmlim_allow_only_backend') != 'on') {
      // loop through the array looking for the tag you set. Switch to true if the tag is     found.
   $locAdd = array();  
   $pickupAdd = array(); 
   foreach ($cart as $array_item) {
        if (isset($array_item['select_location']['location_name'])) {
          $terms = get_terms(array('taxonomy' => 'locations', 'hide_empty' => false, 'parent' => 0));
          foreach ($terms as $term) {
            if ($term->name == $array_item['select_location']['location_name']) {
              $term_id = $term->term_id;
              $term_name = $term->name;
              $streetNumber = get_term_meta($term_id, 'wcmlim_street_number', true);
              
              $route = get_term_meta($term_id, 'wcmlim_route', true);
              $locality = get_term_meta($term_id, 'wcmlim_locality', true);
              $state = get_term_meta($term_id, 'wcmlim_administrative_area_level_1', true);
              $postal_code = get_term_meta($term_id, 'wcmlim_postal_code', true);
              $country = get_term_meta($term_id, 'wcmlim_country', true);
			  $pickup = get_term_meta($term_id, 'wcmlim_allow_pickup', true);
			  $isClearCart = get_option('wcmlim_clear_cart');
			  $arrayloc = $streetNumber . " " . $locality . " " . $state . " " . $route;
        $cart_message = "<b>Pickup Address for $term_name: </b>" . $streetNumber . " " . $route . " " . $locality . " "  . $state . " " . $postal_code . " " . $country . "<br/>";
        if (!empty($cart_message)) {
          ?>
            <tr class="shipping-pickup-store ">
              <td colspan="2">
                <p class="message"><?= $cart_message ?></p>
              </td>
            </tr>
          <?php
          }
          }}}}
	  if(count(array_unique($pickupAdd)) === 1 && $isClearCart == false )  {
		// echo "<script language='javascript'>
		// jQuery( document ).ready(function($) {
		//   $('#place_order').hide(); 
		//   $('.checkout-button').hide(); 
		// });
		// </script>";
		} 
    
    } elseif (get_option('wcmlim_allow_only_backend') == 'on') {
      ?>
      <tr class="shipping-pickup-store">
      
        <th><strong><?php echo "Pickup Location"; ?></strong></th>
        <td>
          <select name="wcmlim_pickup" id="wcmlim_pickup" class="wcmlim_pickup" style="width: fit-content;">
          <option value="-1">-Select-</option>
            <?php
            // Loop over $cart items
            if (!empty(WC()->cart->get_cart())) {
              $terms = get_terms(array('taxonomy' => 'locations', 'hide_empty' => false, 'parent' => 0));
              foreach ($terms as $key => $term) {

            ?>
                <option data-termid="<?php esc_html_e($term->term_id); ?>" value="<?php esc_html_e($term->name); ?>"><?php echo $term->name; ?></option>
            <?php


              }
            }

            ?>
          </select>
          <p class="local_pickup_address"></p>
        </td>
        
        
      </tr>
<?php
    }
  }
}
add_action('woocommerce_review_order_after_shipping', 'wcmlim_location_row_layout');

/**
 ** Save the Location meta.
 **/
function wcmlim_location_save_order_meta($order_id)
{
  // get order details data...
  $order = new WC_Order($order_id);
  $location = isset($_POST['wcmlim_pickup']) ? $_POST['wcmlim_pickup'] : '';

  $terms = get_terms(array('taxonomy' => 'locations', 'hide_empty' => false, 'parent' => 0));
  foreach ($terms as $key => $term) {
    if ($term->name == $location) {
      foreach ($order->get_items() as $item_id => $item) {
        $product_id = $item->get_product_id();
        wc_add_order_item_meta($item_id, "Location", $term->name);
        wc_add_order_item_meta($item_id, "_selectedLocTermId", $term->term_id);
      }
    }
  }
}
add_action('woocommerce_checkout_update_order_meta', 'wcmlim_location_save_order_meta');
