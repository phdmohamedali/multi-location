!function(t){t(document).on("click",".single_add_to_cart_button",a=>{const{ajaxurl:n}=multi_inventory;ajax_mini_cart_count=t(".cart-contents .count").html(),"0 items"==ajax_mini_cart_count&&jQuery.ajax({url:n,type:"post",data:{action:"wcmlim_empty_cart_content"},success(t){console.log(t)}});const{cartlocations:o}=multi_inventory,e=o.split(",");var c=t("#select_location").val().trim();return!1!==e.includes(c)||"0 items"==ajax_mini_cart_count||(Swal.fire({title:"Cart Validation",text:"Your cart contains items from another location, do you want to update the cart",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Update Cart!"}).then(t=>{t.isConfirmed&&jQuery.ajax({url:n,type:"post",data:{action:"wcmlim_empty_cart_content"},success(t){Swal.fire({title:"Updated Cart!",text:"Your cart items has been updated, Please add the item again!",icon:"success"}).then(()=>{window.location.href=window.location.href})}})}),!1)})}(jQuery);