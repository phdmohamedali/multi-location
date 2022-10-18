jQuery( document ).ready( function ( $ )
{
  $.noConflict();
  $( ".wcmlim_storeloc  .wcmlim-change-lc-select option" ).hide();
  const { ajaxurl } = multi_inventory;
  $( "#wcmlim-change-sl-select, #wcmlim-change-sl-select option" ).on( "change", function ()
  {
    const selectedstoreValue = $( this ).find( "option:selected" ).val();
    const sclassname = $( this ).find( "option:selected" ).attr( 'class' );
    // $( this ).prop( 'disabled', true );
    $( '.wcmlim-lc-select' ).prop( 'disabled', true );
    $( '#wcmlim-change-lcselect' ).prop( 'disabled', true );
    $( '.wcmlim-change-sl1' ).prop( 'disabled', true );
    $.ajax( {
      type: "POST",
      url: ajaxurl,
      data: {
        selectedstoreValue,
        action: "wcmlim_drop2_location",
      },
      dataType: "json",
      success ( data )
      {
        $( ".wcmlim-lc-select" ).empty();
        $( ".wcmlim_lcselect" ).empty();
        var locat = JSON.parse( JSON.stringify( data ) )
        if ( locat )
        {
          var size = Object.keys( locat ).length;
          $( ".wcmlim-lc-select" ).prepend(
            `<option value="-1" selected="selected"  >Please Select</option>`
          );
          $( "#wcmlim-change-lcselect" ).prepend(
            `<option value="-1" selected="selected"  >Please Select</option>`
          );
          $.each( data, function ( i, value )
          {
            var name = value.wcmlim_areaname;
            if ( name == null || name == "" )
            {
              name = value.location_name;
            }
            var seled = value.selected;
            if ( seled == value.vkey )
            {
              $( "<option></option>" )
                .attr( "value", value.vkey )
                .text( name )
                .attr( "class", value.classname )
                .attr( "selected", "selected" )
                .attr( "data-lc-storeid", value.location_storeid )
                .attr( "data-lc-name", name )
                .attr( "data-lc-loc", value.location_slug )
                .attr( "data-lc-term", value.term_id )
                .appendTo( ".wcmlim-lc-select" );
              $( "<option></option>" )
                .attr( "value", value.vkey )
                .text( name )
                .attr( "class", value.classname )
                .attr( "selected", "selected" )
                .attr( "data-lc-storeid", value.location_storeid )
                .attr( "data-lc-name", name )
                .attr( "data-lc-loc", value.location_slug )
                .attr( "data-lc-term", value.term_id )
                .appendTo( "#wcmlim-change-lcselect" );
            } else
            {
              $( "<option></option>" )
                .attr( "value", value.vkey )
                .text( name )
                .attr( "class", value.classname )
                .attr( "data-lc-storeid", value.location_storeid )
                .attr( "data-lc-name", name )
                .attr( "data-lc-loc", value.location_slug )
                .attr( "data-lc-term", value.term_id )
                .appendTo( ".wcmlim-lc-select" );
              $( "<option></option>" )
                .attr( "value", value.vkey )
                .text( name )
                .attr( "class", value.classname )
                .attr( "data-lc-storeid", value.location_storeid )
                .attr( "data-lc-name", name )
                .attr( "data-lc-loc", value.location_slug )
                .attr( "data-lc-term", value.term_id )
                .appendTo( "#wcmlim-change-lcselect" );
            }

          } );
        }
        $( '.wcmlim-lc-select' ).removeAttr( "disabled" );
        $( '#wcmlim-change-lcselect' ).removeAttr( "disabled" );
        $( '.wcmlim-change-sl1' ).removeAttr( "disabled" );
        $( '#wcmlim-change-sl-select' ).removeAttr( "disabled" );
        $( this ).removeAttr( "disabled" );
        $( '.wcmlim_changesl' ).removeAttr( "disabled" );
      },
      error ( res )
      {
        console.log( res );
      },
    } );
  } );
} );
