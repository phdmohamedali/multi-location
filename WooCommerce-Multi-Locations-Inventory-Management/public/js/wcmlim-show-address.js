jQuery( document ).ready( function ( $ )
{
    jQuery( document ).on( "click", "#wcmlim_pickup", function ( e )
    {
        var dropDownId = $( '#wcmlim_pickup :selected' ).attr( 'data-termid' );
        jQuery.ajax( {
            type: "POST",

            url: admin_url.ajax_url,
            data: {
                action: "show_address",
                location_id: dropDownId,
            },
            success: function ( result )
            {
                var response = JSON.parse( result );
                var street_address = response.street_address;
                var wcmlim_route = response.wcmlim_city;
                var wcmlim_postcode = response.wcmlim_postcode;
                var wcmlim_state = response.wcmlim_state;
                var wcmlim_state_code = response.wcmlim_state_code;
                var wcmlim_country_state = response.wcmlim_country_state;
                var wcmlim_country_code = response.wcmlim_country_code;
                var wcmlim_email = response.wcmlim_email;
                var wcmlim_phone = response.wcmlim_phone;
                if ( wcmlim_route == '' )
                {
                    var address = street_address + "," + " " + wcmlim_postcode + "," + " " + wcmlim_state + "," + " " + wcmlim_country_state;
                }
                else
                {
                    var address = street_address + "," + " " + wcmlim_route + "," + " " + wcmlim_postcode + "," + " " + wcmlim_state + "," + " " + wcmlim_country_state;
                }
                if ( wcmlim_email != '' )
                {
                    address = address + "" + "<br>" + " <b>Email Address:</b> " + wcmlim_email;
                }
                if ( wcmlim_phone != '' )
                {
                    address = address + "" + "<br>" + " <b>Phone No</b> - " + wcmlim_phone;
                }
                if ( address != "" )
                {
                    jQuery( '.local_pickup_address' ).html( '<p class="local_pickup_address_html">' + address + '</p>' );
                }
                if ( wcmlim_postcode == undefined )
                {
                    jQuery( '.local_pickup_address' ).html( '<p class="local_pickup_address_html">' + '' + '</p>' );
                }
            },
            error ( res )
            {
                console.log( res );
            },
        } );
    } );
} );