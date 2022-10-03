<?php
/**
 *
 * This class defines all code related to custom rest api endpoints.
 *
 * @since      1.2.13
 * @package    Wcmlim
 * @subpackage Wcmlim/includes
 * @author     techspawn1 <contact@techspawn.com>
 */
class Wcmlim_Rest_Api
{
    public function __construct(){
        add_action( "rest_api_init", [$this, "wcmlim_register_rest_routes"]);
        add_action('woocommerce_api_loaded', [$this, "wcmlim_load_apifile"]);
        add_filter('woocommerce_api_classes', [$this, "wcmlim_init_api_class"]);
        add_action("woocommerce_rest_insert_product_object", [$this,"wcmlim_set_location_oninsert"], 10, 3);
        add_filter('woocommerce_rest_prepare_product_object', [$this,'wcmlim_modify_product_object'], 10, 3);
    }

    /**
     * Registers all rest routes
     */
    public function wcmlim_register_rest_routes(){

        // *Register Locations rest route
        register_rest_route('wc/v3', '/locations/', array(
            'callback' => [$this, 'wcmlim_rest_location'],
            'permission_callback' => '__return_true',
        ));

        // *Register Locations create rest route
        register_rest_route( 'wc/v3', '/locations/create/', array(
            'methods' => 'POST',
            'callback' => [$this, 'wcmlim_rest_create_location'],
            'permission_callback' => '__return_true',
        ));

        // *Register Locations update rest route
        register_rest_route( 'wc/v3', '/locations/update/(?P<id>\d+)', array(
            'methods' => 'POST',
            'callback' => [$this, 'wcmlim_rest_update_location'],
            'permission_callback' => '__return_true',
        ));

        // *Register Locations delete rest route
        register_rest_route( 'wc/v3', '/locations/remove/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'wcmlim_rest_remove_location'],
            'permission_callback' => '__return_true',
        ));

        // *Register Locations update rest route
        register_rest_route( 'wc/v3', '/locations/read/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'wcmlim_rest_read_location'],
            'permission_callback' => '__return_true',
        ));
    }

     /**
     * callback function for locations rest route
     */
    public function wcmlim_rest_location()
    {
        $terms = get_terms(array('taxonomy' => 'locations', 'hide_empty' => false, 'parent' => 0));
        if (empty($terms)) {
            return new WP_Error('empty_locations', 'there is no Locations', array('status' => 404));
        }
        return $terms;
    }

    //remove location rest api endpoint callback
    function wcmlim_rest_remove_location(WP_REST_Request $request)
    {
        $term_id = isset($request['id']) ? $request['id'] : "" ;
        if(isset($term_id)){
            wp_delete_term( $term_id, "locations");
            return "Removed Requested Location";
        }else{
            return "Requested Location #{$term_id} not found";
        }
    }
    //remove location rest api endpoint callback
    function wcmlim_rest_read_location(WP_REST_Request $request)
    {
        $term_id = isset($request['id']) ? $request['id'] : "" ;
        if(isset($term_id)){
            $termtmp = array();

            $taxonomy_name = 'locations';
            // Retrieve taxonomy terms
            $terms = get_terms(array('taxonomy' => 'locations', 'hide_empty' => false, 'parent' => 0));
            foreach ($terms as $term) {
                if($term->term_id == $term_id)
                {
                    $termtmp = $term;
                }
            }
        }else{
            $termtmp = array("Requested Location #{$term_id} not found"); 
        }
        if(empty($termtmp))
        {
            $termtmp = array("Requested Location #{$term_id} not found");
        }
        return $termtmp;
    }
    
    //update location rest api endpoint callback
    function wcmlim_rest_update_location(WP_REST_Request $request)
    {
        $term_id = $request['id'];
        $parameter = $request->get_params();
        $loc_name = isset($parameter['name']) ? $parameter['name'] : "";
        $loc_slug = isset($parameter['slug']) ? $parameter['slug'] : "";
        $loc_wcmlim_street_number = isset($parameter['wcmlim_street_number']) ? $parameter['wcmlim_street_number'] : "";
        $loc_wcmlim_route = isset($parameter['wcmlim_route']) ? $parameter['wcmlim_route'] : "";
        $loc_wcmlim_locality = isset($parameter['wcmlim_locality']) ? $parameter['wcmlim_locality'] : "";
        $loc_wcmlim_administrative_area_level_1 = isset($parameter['wcmlim_administrative_area_level_1']) ? $parameter['wcmlim_administrative_area_level_1'] : "";
        $loc_wcmlim_postal_code = isset($parameter['wcmlim_postal_code']) ? $parameter['wcmlim_postal_code'] : "";
        $loc_wcmlim_country = isset($parameter['wcmlim_country']) ? $parameter['wcmlim_country'] : "";
        $loc_wcmlim_email = isset($parameter['wcmlim_email']) ? $parameter['wcmlim_email'] : "";
        $loc_wcmlim_phone = isset($parameter['wcmlim_phone']) ? $parameter['wcmlim_phone'] : "";
        $loc_wcmlim_start_time = isset($parameter['wcmlim_start_time']) ? $parameter['wcmlim_start_time'] : "";
        $loc_wcmlim_end_time = isset($parameter['wcmlim_end_time']) ? $parameter['wcmlim_end_time'] : "";
        if($loc_name != '' && $loc_name != null)
        {
            wp_update_term( $term_id, 'locations', array('name' => sanitize_text_field($loc_name)));
        }
        if($loc_slug != '' && $loc_slug != null)
        {
            wp_update_term( $term_id, 'locations', array('slug' => sanitize_text_field($loc_slug)));
        }
        if($loc_wcmlim_street_number != '' && $loc_wcmlim_street_number != null)
        {
            update_term_meta($term_id, 'wcmlim_street_number', sanitize_text_field($loc_wcmlim_street_number));
        }
        if($loc_wcmlim_route != '' && $loc_wcmlim_route != null)
        {
            update_term_meta($term_id, 'wcmlim_route', sanitize_text_field($loc_wcmlim_route));
        }
        if($loc_wcmlim_locality != '' && $loc_wcmlim_locality != null)
        {
            update_term_meta($term_id, 'wcmlim_locality', sanitize_text_field($loc_wcmlim_locality));
        }
        if($loc_wcmlim_administrative_area_level_1 != '' && $loc_wcmlim_administrative_area_level_1 != null)
        {
            update_term_meta($term_id, 'wcmlim_administrative_area_level_1', sanitize_text_field($loc_wcmlim_administrative_area_level_1));
        }
        if($loc_wcmlim_postal_code != '' && $loc_wcmlim_postal_code != null)
        {
            update_term_meta($term_id, 'wcmlim_postal_code', sanitize_text_field($loc_wcmlim_postal_code));
        }
        if($loc_wcmlim_country != '' && $loc_wcmlim_country != null)
        {
            update_term_meta($term_id, 'wcmlim_country', sanitize_text_field($loc_wcmlim_country));
        }
        if($loc_wcmlim_email != '' && $loc_wcmlim_email != null)
        {
            update_term_meta($term_id, 'wcmlim_email', sanitize_text_field($loc_wcmlim_email));
        }
        if($loc_wcmlim_phone != '' && $loc_wcmlim_phone != null)
        {
            update_term_meta($term_id, 'wcmlim_phone', sanitize_text_field($loc_wcmlim_phone));
        }
        if($loc_wcmlim_start_time != '' && $loc_wcmlim_start_time != null)
        {
            update_term_meta($term_id, 'wcmlim_start_time', sanitize_text_field($loc_wcmlim_start_time));
        }
        if($loc_wcmlim_end_time != '' && $loc_wcmlim_end_time != null)
        {
            update_term_meta($term_id, 'wcmlim_end_time', sanitize_text_field($loc_wcmlim_end_time));
        }
        $term_data = get_term_by( 'id', $term_id, 'locations' );
        $streetNumber = get_term_meta($term_id, 'wcmlim_street_number', true);
        $route = get_term_meta($term_id, 'wcmlim_route', true);
        $locality = get_term_meta($term_id, 'wcmlim_locality', true);
        $state = get_term_meta($term_id, 'wcmlim_administrative_area_level_1', true);
        $postal_code = get_term_meta($term_id, 'wcmlim_postal_code', true);
        $email = get_term_meta($term_id, 'wcmlim_email', true);
        $phone = get_term_meta($term_id, 'wcmlim_phone', true);
        $starttime = get_term_meta($term_id, 'wcmlim_start_time', true);
        $endtime = get_term_meta($term_id, 'wcmlim_end_time', true);
        $tmparr = array(
            "term_id" => $term_id,
            "term_name" => $term_data->name,
            "term_slug" => $term_data->slug,
            "wcmlim_email" => $email,
            "wcmlim_phone"=> $phone,
            "wcmlim_street_number"=> $streetNumber,
            "wcmlim_route"=> $route,
            "wcmlim_locality"=> $locality,
            "wcmlim_administrative_area_level_1"=> $state,
            "wcmlim_postal_code"=> $postal_code,
            "country"=> $country,
            "wcmlim_start_time"=> $starttime,
            "wcmlim_end_time"=> $endtime
        );
        return array_merge($term_data, $tmparr);
    }

    //create location rest api endpoint callback
    function wcmlim_rest_create_location(WP_REST_Request $request)
    {
        $response = array();
        $parameter = $request->get_params();
        if(empty($parameter)){
            $response['status'] = 404;
            $response['messgae'] = 'Not Found...!';
            return $response;
        }
       
        $loc_name = isset($parameter['name']) ? $parameter['name'] : "";
        $loc_slug = isset($parameter['slug']) ? $parameter['slug'] : "";
        $loc_wcmlim_street_number = isset($parameter['wcmlim_street_number']) ? $parameter['wcmlim_street_number'] : "";
        $loc_wcmlim_route = isset($parameter['wcmlim_route']) ? $parameter['wcmlim_route'] : "";
        $loc_wcmlim_locality = isset($parameter['wcmlim_locality']) ? $parameter['wcmlim_locality'] : "";
        $loc_wcmlim_administrative_area_level_1 = isset($parameter['wcmlim_administrative_area_level_1']) ? $parameter['wcmlim_administrative_area_level_1'] : "";
        $loc_wcmlim_postal_code = isset($parameter['wcmlim_postal_code']) ? $parameter['wcmlim_postal_code'] : "";
        $loc_wcmlim_country = isset($parameter['wcmlim_country']) ? $parameter['wcmlim_country'] : "";
        $loc_wcmlim_email = isset($parameter['wcmlim_email']) ? $parameter['wcmlim_email'] : "";
        $loc_wcmlim_phone = isset($parameter['wcmlim_phone']) ? $parameter['wcmlim_phone'] : "";
        $loc_wcmlim_start_time = isset($parameter['wcmlim_start_time']) ? $parameter['wcmlim_start_time'] : "";
        $loc_wcmlim_end_time = isset($parameter['wcmlim_end_time']) ? $parameter['wcmlim_end_time'] : "";
    
        //get the term to check if exists
        $validate_loc  = get_term_by('name', $loc_name , "locations");
        if($validate_loc == false){
            $term = wp_insert_term( $loc_name, "locations", array('slug' => $loc_slug,));
            $term_id = $term['term_id'];
        }else{
            $term_id = $validate_loc->term_id;
        }

        $arr_term_id = array(
            "id" => $term_id,
            "name" => $loc_name,
            "slug" => $loc_slug,
            "wcmlim_street_number" => $loc_wcmlim_street_number,
            "wcmlim_route" => $loc_wcmlim_route,
            "wcmlim_locality" => $loc_wcmlim_locality,
            "wcmlim_administrative_area_level_1" => $loc_wcmlim_administrative_area_level_1,
            "wcmlim_postal_code" => $loc_wcmlim_postal_code,
            "wcmlim_country" => $loc_wcmlim_country,
            "wcmlim_email" => $loc_wcmlim_email,
            "wcmlim_phone" => $loc_wcmlim_phone,
            "wcmlim_start_time" => $loc_wcmlim_start_time,
            "wcmlim_end_time" => $loc_wcmlim_end_time
        );
        if($loc_name != '' && $loc_name != null)
        {
            update_term_meta($term_id, 'name', sanitize_text_field($loc_name));
        }
        if($loc_slug != '' && $loc_slug != null)
        {
            update_term_meta($term_id, 'slug', sanitize_text_field($loc_slug));
        }
        if($loc_wcmlim_street_number != '' && $loc_wcmlim_street_number != null)
        {
            update_term_meta($term_id, 'wcmlim_street_number', sanitize_text_field($loc_wcmlim_street_number));
        }
        if($loc_wcmlim_route != '' && $loc_wcmlim_route != null)
        {
            update_term_meta($term_id, 'wcmlim_route', sanitize_text_field($loc_wcmlim_route));
        }
        if($loc_wcmlim_locality != '' && $loc_wcmlim_locality != null)
        {
            update_term_meta($term_id, 'wcmlim_locality', sanitize_text_field($loc_wcmlim_locality));
        }
        if($loc_wcmlim_administrative_area_level_1 != '' && $loc_wcmlim_administrative_area_level_1 != null)
        {
            update_term_meta($term_id, 'wcmlim_administrative_area_level_1', sanitize_text_field($loc_wcmlim_administrative_area_level_1));
        }
        if($loc_wcmlim_postal_code != '' && $loc_wcmlim_postal_code != null)
        {
            update_term_meta($term_id, 'wcmlim_postal_code', sanitize_text_field($loc_wcmlim_postal_code));
        }
        if($loc_wcmlim_country != '' && $loc_wcmlim_country != null)
        {
            update_term_meta($term_id, 'wcmlim_country', sanitize_text_field($loc_wcmlim_country));
        }
        if($loc_wcmlim_email != '' && $loc_wcmlim_email != null)
        {
            update_term_meta($term_id, 'wcmlim_email', sanitize_text_field($loc_wcmlim_email));
        }
        if($loc_wcmlim_phone != '' && $loc_wcmlim_phone != null)
        {
            update_term_meta($term_id, 'wcmlim_phone', sanitize_text_field($loc_wcmlim_phone));
        }
        if($loc_wcmlim_start_time != '' && $loc_wcmlim_start_time != null)
        {
            update_term_meta($term_id, 'wcmlim_start_time', sanitize_text_field($loc_wcmlim_start_time));
        }
        if($loc_wcmlim_end_time != '' && $loc_wcmlim_end_time != null)
        {
            update_term_meta($term_id, 'wcmlim_end_time', sanitize_text_field($loc_wcmlim_end_time));
        }

        if (isset($arr_term_id)) {
            // Save the option array.
            update_option("taxonomy_$term_id", $arr_term_id);
        }
        return $arr_term_id;
    }

    public function wcmlim_load_apifile () {
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/wcmlim-api.php';
    }

    public function wcmlim_init_api_class($classes) {
        $classes[] = 'WC_API_WCMLIM';
        return $classes;
    }

    /**
     * This callback function modify existing product object
     * and added locations data key with locations ids as a value
     * @since 1.2.13
     */

    public function wcmlim_modify_product_object($response, $object, $request) {
        if (empty($response->data))
            return $response;
        $id = $object->get_id(); //it will fetch product id 
        $response->data['locations_data'] = wp_get_object_terms( $id, 'locations', array( 'fields' => 'ids' ) );
        return $response;
    }

    /**
     * This callback function responsible for add product to 
     * custom taxonomy locations
     * @since 1.2.13
     */

    public function wcmlim_set_location_oninsert( $product, $request, $true ) {
        $params = $request->get_json_params();
        $ID = $product->get_id();
        if(array_key_exists("locations_data", $params)) {
            wp_set_object_terms( $ID,  $params["locations_data"], 'locations' );
        }
    }

}

new Wcmlim_Rest_Api();