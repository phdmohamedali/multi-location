jQuery( document ).ready( ( $ ) =>
{
  $.noConflict();
$( "#select_location" ).on( "change", function ( e )
{
  const selectedValue = $( this ).find( "option:selected" ).val();
  if ( selectedValue  == -1){
    $('#wcmlim_get_direction_for_location').hide();
  }
  if ($('#wcmlim_get_direction_for_location').length>0) {
    $('#wcmlim_get_direction_for_location').hide();
  }
    var value =  $("#select_location").find(':selected').attr('data-lc-address');
    var encode_value = atob(value);
    var getdirection_link='https://www.google.com/maps?saddr=&daddr='+encode_value;
    
    $('<a id="wcmlim_get_direction_for_location" target="_blank" href="'+getdirection_link+'">Get Direction</a>').insertAfter(' #globMsg');
});
});