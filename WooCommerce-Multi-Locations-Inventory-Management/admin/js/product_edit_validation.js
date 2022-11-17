
jQuery( document ).ready( ( $ ) =>
{
 jQuery( ".wcmlim_product_regular_price" ).change( function ()
 {  
   let locid = $(this).attr('loc-id');
   
   let proid = $(this).attr('pro-id');
   let current_sales_price = $("#wcmlim_product_"+proid+"_sale_price_at_"+locid).val();
   let current_regular_price = $("#wcmlim_product_"+proid+"_regular_price_at_"+locid).val();
   if(current_regular_price == '' && current_sales_price != '')
   {
     $("#wcmlim_product_"+proid+"_sale_price_at_"+locid).val('');
     alertify.set("notifier", "position", "bottom");
     alertify.error("please enter price less than regular price");
   }
else
 if(parseFloat(current_sales_price) > parseFloat(current_regular_price) && (current_regular_price != ''))
{
 $("#wcmlim_product_"+proid+"_sale_price_at_"+locid).val('');
 alertify.set("notifier", "position", "bottom");
 alertify.error("please enter price less than regular price");
}
});

jQuery( ".wcmlim_product_sale_price" ).change( function (){

   let locid = $(this).attr('loc-id');
   
   let proid = $(this).attr('pro-id');
   let current_sales_price = $("#wcmlim_product_"+proid+"_sale_price_at_"+locid).val();
   let current_regular_price = $("#wcmlim_product_"+proid+"_regular_price_at_"+locid).val();

   if(current_regular_price == '' && current_sales_price != '')
   {
     $("#wcmlim_product_"+proid+"_sale_price_at_"+locid).val('');
     alertify.set("notifier", "position", "bottom");
     alertify.error("please enter price less than regular price");
   }
else
   if(parseFloat(current_sales_price) > parseFloat(current_regular_price) && (current_regular_price != ''))
{
 
 $("#wcmlim_product_"+proid+"_sale_price_at_"+locid).val('');
 alertify.set("notifier", "position", "bottom");
 alertify.error("please enter price less than regular price");
}
});


// For variable product


$(document).on("change", '.wcmlim_variable_product_regular_price', function() { 

   let locid = $(this).attr('loc-id');
   let proid = $(this).attr('pro-id');
   let current_sales_price = $("#wcmlim_variation_"+proid+"_sale_price_at_"+locid).val();
   let current_regular_price = $("#wcmlim_variation_"+proid+"_regular_price_at_"+locid).val();
   if(current_regular_price == '' && current_sales_price != '')
   {
    
     $("#wcmlim_variation_"+proid+"_sale_price_at_"+locid).val('');
     alertify.set("notifier", "position", "bottom");
     alertify.error("please enter price less than regular price");
   }
else
 if(parseFloat(current_sales_price) > parseFloat(current_regular_price) && (current_regular_price != ''))
{
 $("#wcmlim_variation_"+proid+"_sale_price_at_"+locid).val('');
 alertify.set("notifier", "position", "bottom");
 alertify.error("please enter price less than regular price");
}
});


$(document).on("change", '.wcmlim_variable_product_sale_price', function() { 
   let locid = $(this).attr('loc-id');
   let proid = $(this).attr('pro-id');
   let current_sales_price = $("#wcmlim_variation_"+proid+"_sale_price_at_"+locid).val();
   let current_regular_price = $("#wcmlim_variation_"+proid+"_regular_price_at_"+locid).val();

   if(current_regular_price == '' && current_sales_price != '')
   {
     $("#wcmlim_variation_"+proid+"_sale_price_at_"+locid).val('');
     alertify.set("notifier", "position", "bottom");
     alertify.error("please enter price less than regular price");
   }
else
   if(parseFloat(current_sales_price) > parseFloat(current_regular_price) && (current_regular_price != ''))
{
 $("#wcmlim_variation_"+proid+"_sale_price_at_"+locid).val('');
 alertify.set("notifier", "position", "bottom");
 alertify.error("please enter price less than regular price");
}
});

});