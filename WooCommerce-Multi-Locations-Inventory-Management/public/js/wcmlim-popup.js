( function ( $ )
{
  var showinpopup = multi_inventory_popup.show_in_popup;
  var forcetoselect = multi_inventory_popup.force_to_select;
  $( ".set-def-store-popup-btn" ).click( function ( event )
  {
    event.preventDefault();
    popupswitch();
  } );

  function popupswitch ()
  {
    switch ( showinpopup )
    {
      case "select":
        // console.log( "in select" );
        $( "#set-def-store .rlist_location, #set-def-store .postcode-checker" ).hide();
        if ( !$( "#set-def-store #wcmlim-change-lc-select" ).is( ":visible" ) )
        {
          $( "#set-def-store #wcmlim-change-lc-select" ).removeAttr( "style" );
          jQuery( "#set-def-store #wcmlim-change-lc-select" ).css( "display", "block" );
        }
        break;

      case "input":
        // console.log( "in input" );
        $( "#set-def-store .rlist_location" ).hide();
        $( "#set-def-store .wcmlim_sel_location" ).hide();
        $( "#set-def-store .postcode-checker" ).show();
        break;

      case "list":
        console.log( "in list" );
        $( "#set-def-store .postcode-checker, #wcmlim-change-lc-select" ).hide();
        $( "#set-def-store .rlist_location" ).show();
        break;
      default:
        // console.log( "in default" );
        //   $(".rlist_location, .postcode-checker").hide();
        //   jQuery("#wcmlim-change-lc-select").show();
        break;
    }
  }

  function getCookie ( name )
  {
    const dc = document.cookie;
    const prefix = `${ name }=`;
    let begin = dc.indexOf( `; ${ prefix }` );
    if ( begin == -1 )
    {
      begin = dc.indexOf( prefix );
      if ( begin != 0 ) return null;
    } else
    {
      begin += 2;
      var end = document.cookie.indexOf( ";", begin );
      if ( end == -1 )
      {
        end = dc.length;
      }
    }
    // because unescape has been deprecated, replaced with decodeURI
    // return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI( dc.substring( begin + prefix.length, end ) );
  }

  $( ".set-def-store-popup-btn" ).magnificPopup( {
    type: "inline",
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    closeOnBgClick: false,
    enableEscapeKey: false,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    // mainClass: 'portfolio_popup'
  } );
  var checkLocation = getCookie( "wcmlim_selected_location" );

  if ( forcetoselect == "on" && (checkLocation == null || checkLocation == '-1' ))
  {
    jQuery( ".mfp-close" ).hide();
    $( ".set-def-store-popup-btn" ).click();
  }
} )( jQuery );
