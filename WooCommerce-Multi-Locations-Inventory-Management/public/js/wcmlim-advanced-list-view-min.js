jQuery(document).ready(i=>{i.noConflict();let{ajaxurl:t}=multi_inventory,{wc_currency:l}=multi_inventory;multi_inventory.autodetect;let{enable_price:e}=multi_inventory;multi_inventory.user_specific_location,multi_inventory.show_location_selection;let{instock:c}=multi_inventory,{soldout:a}=multi_inventory;multi_inventory.stock_format;let{widget_select_type:o}=multi_inventory;multi_inventory.nxtloc;var s=multi_inventory.store_on_map_arr,n=multi_inventory.default_zoom,r=multi_inventory.setting_loc_dis_unit,d=multi_inventory.optiontype_loc,m=multi_inventory.scoptiontype_loc,p=multi_inventory.fulladd,v=multi_inventory.viewformat,w=multi_inventory.wchideoosproduct,u=multi_inventory.NextClosestinStock,h=multi_inventory.isdefault;let{isClearCart:f}=multi_inventory,{isLocationsGroup:g}=multi_inventory;function y(){if("on"==d&&"advanced_list_view"==v){if(i(".rselect_location").removeClass("wclimscroll"),i(".rselect_location").removeClass("wclimhalf"),i(".rselect_location").removeClass("wclimthird"),i(".rselect_location").removeClass("wclimfull"),i(".loc_dd.Wcmlim_prefloc_sel .wc_scrolldown").hide(),i(".rselect_location").addClass("wclimadvlist"),i(".variation_id").length)var e=i("input.variation_id").val();else var e=i(".single_add_to_cart_button").val();0!=e&&i.ajax({type:"POST",url:t,data:{action:"wcmlim_prepare_advanced_view_information",product_id:e},dataType:"json",success(t){i.each(t,function(t,c){console.log(c);var a=c.indexing,o=c.location_id,s=c.loc_stock_pid,n=c.stock_price,r=c.shipping_cost,d="<div class='wcmlim-advanced-detailed'>";d+="<span class='wcmlim_list_view_price'> "+l+n+"</span><br>",d+="<span class='wcmlim_list_view_shippingprice'><span class='wcmlim-adv-li-icon fa fa-truck'></span>: "+r+"</span>",d+="</div>",html2="<div class='wcmlim_addtocart'><input type='number' class='input-text qty text wcmlim_list_view_custom_input' step='1' min='1' max='"+s+"' title='Qty' size='4' placeholder='1' inputmode='numeric' autocomplete='off'>",html2+="<button type='submit' data-lc-term-id='"+o+"' name='add-to-cart' id='list_view' value='"+e+"' class='single_add_to_cart_button single_add_to_cart_button1 button alt'><span class='fa fa-shopping-cart'></span></button>",html2+="</div>",i(".wclimrw_"+a+" .wclimcol2").wrap('<div class="wcmlim_wrapper_adv_list_view"></div>'),jQuery(d).insertAfter(".wclimrw_"+a+" .wclimcol2"),jQuery(html2).insertAfter(".wclimrw_"+a+" .wcmlim_wrapper_adv_list_view")});var c=t.length;i(".wclimrw_"+(c+=1)).remove()}})}i(document).on("mouseover",".wclimrow",function(){if(!1===i(this).children("input").prop("checked")){i(this).children("input").prop("checked",!0),i(this).children("input").trigger("click"),i(".wclimcol1").removeClass("selected"),i(this).toggleClass("selected");var t=i(this).children(".wcmlim_addtocart").children("input").val();""==t&&(t=1),i("div.quantity").children("input").val(t)}})}y(),i(".variation_id").change(()=>{y()})});