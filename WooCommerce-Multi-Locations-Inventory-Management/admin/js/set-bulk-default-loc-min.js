!function(e){e(document).on("click","#assignitloc",function(t){if(t.preventDefault(),e("body").hasClass("post-type-product")){var s=e("#bulk_default_selection").val(),o=e("#bulk_default_selection").find("option:selected").data("termid");if(-1==s)return alertify.error("Choose location from dropdown.."),!0;var r=e(".posts > #the-list input[type=checkbox]:checked").map(function(){return e(this).attr("value")}).get();if(0==r.length)return alertify.error("Select at least one Product.."),!0;r.forEach(t=>{e.ajax({type:"POST",url:multi_inventory.ajaxurl,data:{action:"bulk_assign_default_location",productids:t,selected:o,type:"product"},success:function(e){"success"==e&&(alertify.success("location assigned"),document.getElementById("cb-select-"+t).checked=!1),"fail"==e&&alertify.error("something went wrong...!")}})})}if(e("body").hasClass("users-php")){var a=e("#bulk_default_selection").val();if(-1==a)return alertify.error("Choose location from dropdown.."),!0;alert("you are on users list page");var c=e(".users > #the-list input[type=checkbox]:checked").map(function(){return e(this).attr("value")}).get();if(0==c.length)return alertify.error("Select at least one user.."),!0;c.forEach(t=>{e.ajax({type:"POST",url:multi_inventory.ajaxurl,data:{action:"bulk_assign_default_location",userids:t,selected:a,type:"users"},success:function(e){"success"==e&&alertify.success("location assigned"),"fail"==e&&alertify.error("something went wrong...!")}})})}})}(jQuery);