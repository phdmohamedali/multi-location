jQuery( document ).ready( ( $ ) =>
{
  $( "#updateAllorder" ).on( "click", () =>
  {
       $.ajax( {
        url: multi_inventory.ajaxurl,
        type: "post",
        data: {
          action: "update_order_data",
        },
        beforeSend ()
        {
          // Show image container
          $( "#pup_loader" ).show();
          $( "#pup_loader" ).find( ".spinner" ).css( "visibility", "visible" );
        },
        success ( response )
        {
          //   console.log(response);
          if ( response )
          {
            // alert(response);
            alertify.success( response );
          }
          // location.reload();
        },
        complete ( data )
        {
          // Hide image container
          $( "#pup_loader" ).hide();
        },
     // } );
    } );
    return;

  } );
} );
