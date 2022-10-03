( function ( $ )
{
    $( document ).ready( function ()
    {
        const elementBody = jQuery( 'body' );
        if ( typeof multi_inventory !== 'undefined' )
        {
            const userStatus = multi_inventory.isUserLoggedIn;
            const loginUrl = multi_inventory.loginURL;
            const isAdmin = multi_inventory.isUserAdmin;
            const myStorage = window.sessionStorage;
            const selKey = multi_inventory.resUserSLK;

            if ( !userStatus && !elementBody.hasClass( "login-action-login" ) )
            {
                const conTent = `<div id="restrict_user_not_logged_in" style="display:none;"><div class="notice notice-warning"><p>You must be logged in to purchase this product.<a class="button" href="${ loginUrl }" title="Login">Login</a></p></div></div>`;
                myStorage.setItem( 'rsnlc', conTent );
            } else
            {
                if ( isAdmin )
                {
                    myStorage.setItem( 'rsula', '<div id="restrict_user_logged_in_as_admin" style="display:none;"></div>' );
                    return;
                }
                setcookie( "wcmlim_selected_location", selKey );
            }
        }
       
        function setcookie ( name, value, days )
        {
            let date = new Date();
            if ( days )
            {     
            date.setTime( date.getTime() + days * 24 * 60 * 60 * 1000 ); 
            var expires = `; expires=${ date.toUTCString() }`;      
            } else {           
            date.setTime( date.getTime() + 1 * 24 * 60 * 60 * 1000 ); 
            var expires = `; expires=${ date.toUTCString() }`;
            }   
            document.cookie = `${ name }=${ value }${ expires };path=/`;     
        }
    } );

} )( jQuery );
