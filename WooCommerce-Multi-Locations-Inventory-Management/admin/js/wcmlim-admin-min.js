jQuery(document).ready(a => { let b; const c = { street_number: "short_name", route: "long_name", locality: "long_name", administrative_area_level_1: "long_name", country: "long_name", postal_code: "short_name" }, d = document.getElementById("wcmlim_autocomplete_address"); if (d) { function a() { const a = b.getPlace(); if (!a.geometry) return void window.alert("Autocomplete's returned place contains no geometry"); for (const a in c) document.getElementById(a).value = "", document.getElementById(a).disabled = !1; for (let b = 0; b < a.address_components.length; b++) { const d = a.address_components[b].types[0]; if (c[d]) { const e = a.address_components[b][c[d]]; document.getElementById(d).value = e } } } d.addEventListener("focus", () => { b = new google.maps.places.Autocomplete(document.getElementById("wcmlim_autocomplete_address"), {}), b.addListener("place_changed", a) }) } const e = a(".locationsParent").val(); -1 == e ? a(".term-address-wrap, .term-streetNumber-wrap, .term-route-wrap, .term-city-wrap, .term-state-wrap, .term-postcode-wrap, .term-country-wrap, .term-email-wrap, .term-shippingZone-wrap, .term-shopManager-wrap, .term-paymentMethods-wrap, .term-pos-wrap, .term-shippingMethod-wrap").show() : a(".term-address-wrap, .term-streetNumber-wrap, .term-route-wrap, .term-city-wrap, .term-state-wrap, .term-postcode-wrap, .term-country-wrap, .term-email-wrap, .term-shippingZone-wrap, .term-shopManager-wrap, .term-paymentMethods-wrap, .term-pos-wrap, .term-shippingMethod-wrap").hide(), a(".locationsParent").on("change", function () { const b = this.value; -1 == b ? a(".term-address-wrap, .term-streetNumber-wrap, .term-route-wrap, .term-city-wrap, .term-state-wrap, .term-postcode-wrap, .term-country-wrap, .term-email-wrap, .term-shopManager-wrap, .term-paymentMethods-wrap, .term-pos-wrap, .term-shippingMethod-wrap").show() : a(".term-address-wrap, .term-streetNumber-wrap, .term-route-wrap, .term-city-wrap, .term-state-wrap, .term-postcode-wrap, .term-country-wrap, .term-email-wrap, .term-shopManager-wrap, .term-paymentMethods-wrap, .term-pos-wrap, .term-shippingMethod-wrap").hide() }); a("#locationList"); if (a("#_manage_stock").prop("checked")) { a("#locationList").show(), a(".wc_input_stock").prop("disabled", !0); const b = a("#locationList > .locationInner > p > input[type='number']"); let c = 0; b.each((a, b) => { c += parseInt(b.value || 0) }); const d = a(".wc_input_stock").val(); c != d && a("._stock_field").append("<p style='color:red;'>The total stock doesn't match the sum of the locations stock. Please update this product to fix it.</p>") } else a("#locationList").hide(), a("._manage_stock_field").append("<p style='color:red;'>To be able to manage stocks in Locations, please activate the <b>Stock Management</b> option.</p>"); if (a("#woocommerce-product-data").on("woocommerce_variations_loaded", () => { a(".woocommerce_variation").each(b => { const c = a(`input[name$="variable_manage_stock[${b}]"]`); !1 == c.prop("checked") && c.closest("p.options").append("<p style='color:red;'>To be able to manage stocks in Locations, please activate the <b>Stock Management</b> option.</p>") }); const b = a("input.variable_manage_stock"); b.each((c, d) => { if (d.checked) for (let c = 0; c < b.length; c++)a(`input#variable_stock${c}`).prop("disabled", !0) }) }), a("#wcmlim_shipping_zone,#wcmlim_payment_methods,#wcmlim_shipping_method").chosen({ width: "95%" }), a("#wcmlim_shop_manager").chosen({ width: "95%", max_selected_options: 1 }), a("#wcmlim_exclude_locations_from_frontend").chosen({ width: "30%" }), a("#reform").on("click", () => { a.ajax({ url: multi_inventory.ajaxurl, type: "post", data: { action: "reform_plugin_data", security: multi_inventory.check_nonce }, beforeSend() { a("#reform_loader").show(), a("#reform_loader").find(".spinner").css("visibility", "visible") }, success(a) { a && alert("data updated"), location.reload() }, complete() { a("#reform_loader").hide() } }) }), a(".keyEye").on("click", function (b) { b.preventDefault(), a(".keyEye i").toggleClass("fa-eye fa-eye-slash"), "text" == a("#wcmlim_google_api_key").attr("type") ? a("#wcmlim_google_api_key").attr("type", "password") : "password" == a("#wcmlim_google_api_key").attr("type") && a("#wcmlim_google_api_key").attr("type", "text") }), 0 < a(".locationsParent").length) { var f = a("select.locationsParent").children("option:selected").val(); "-1" != f && (a("#start_time").prop("disabled", !0), a("#end_time").prop("disabled", !0), a("#phone").prop("disabled", !0), a(".term-time-wrap").hide(), a(".term-phone-wrap").hide()), a("select.locationsParent").change(function () { a(".button").prop("disabled", !0), a(".button").html("Fetching Details", !0); var b = a(this).children("option:selected").val(); "-1" == b ? (a("#start_time").prop("disabled", !1), a("#end_time").prop("disabled", !1), a("#phone").prop("disabled", !1), a(".term-time-wrap").show(), a(".term-phone-wrap").show(), a(".button").prop("disabled", !1), a(".button").html("Update", !0)) : a.ajax({ url: multi_inventory.ajaxurl, type: "post", data: { action: "show_parent_location_time", loc_id: b }, success(b) { console.log(b); var c = JSON.parse(b); "" != c.start && "" != c.end && (a("#start_time").val(c.start), a("#end_time").val(c.end), a("#phone").val(c.phone)), a("#start_time").prop("disabled", !0), a("#end_time").prop("disabled", !0), a("#phone").prop("disabled", !0), a(".term-time-wrap").hide(), a(".term-phone-wrap").hide(), a(".button").prop("disabled", !1), a(".button").html("Update", !0) } }) }) } jQuery("#wcmlim_allow_only_backend").on("change", function () { jQuery(this).is(":checked") && (switchStatus = jQuery(this).is(":checked"), jQuery("#wcmlim_next_closest_location").prop("checked", !1), jQuery("#wcmlim_hide_out_of_stock_location").prop("checked", !1), jQuery("#wcmlim_clear_cart").prop("checked", !1), jQuery("#wcmlim_enable_userspecific_location").prop("checked", !1), jQuery("#wcmlim_preferred_location").prop("checked", !1), jQuery("#wcmlim_enable_autodetect_location").prop("checked", !1), jQuery("#wcmlim_geo_location").prop("checked", !1), jQuery("#wcmlim_enable_price").prop("checked", !1), jQuery("#wcmlim_hide_show_location_dropdown").prop("checked", !1), jQuery("#wcmlim_enable_location_onshop").prop("checked", !1), jQuery("#wcmlim_enable_location_price_onshop").prop("checked", !1), jQuery("#wcmlim_sort_shop_asper_glocation").prop("checked", !1), jQuery("#wcmlim_use_location_widget").prop("checked", !1), jQuery("#wcmlim_enable_shipping_zones").prop("checked", !1), jQuery("#wcmlim_enable_shipping_methods").prop("checked", !1), jQuery("#wcmlim_assign_payment_methods_to_locations").prop("checked", !1), jQuery("#wcmlim_order_fulfil_edit").prop("checked", !0), jQuery("#wcmlim_order_fulfil_automatically").prop("checked", !0)) }), jQuery("#wcmlim_order_fulfil_automatically").on("change", function () { jQuery(this).is(":checked") && (switchStatus = jQuery(this).is(":checked"), jQuery("#wcmlim_next_closest_location").prop("checked", !1), jQuery("#wcmlim_hide_out_of_stock_location").prop("checked", !1), jQuery("#wcmlim_clear_cart").prop("checked", !1), jQuery("#wcmlim_enable_userspecific_location").prop("checked", !1), jQuery("#wcmlim_preferred_location").prop("checked", !1), jQuery("#wcmlim_enable_autodetect_location").prop("checked", !1), jQuery("#wcmlim_geo_location").prop("checked", !1), jQuery("#wcmlim_enable_price").prop("checked", !1), jQuery("#wcmlim_hide_show_location_dropdown").prop("checked", !1), jQuery("#wcmlim_enable_location_onshop").prop("checked", !1), jQuery("#wcmlim_enable_location_price_onshop").prop("checked", !1), jQuery("#wcmlim_sort_shop_asper_glocation").prop("checked", !1), jQuery("#wcmlim_use_location_widget").prop("checked", !1), jQuery("#wcmlim_enable_shipping_zones").prop("checked", !1), jQuery("#wcmlim_enable_shipping_methods").prop("checked", !1), jQuery("#wcmlim_assign_payment_methods_to_locations").prop("checked", !1), jQuery("#wcmlim_order_fulfil_edit").prop("checked", !0), jQuery("#wcmlim_allow_only_backend").prop("checked", !0)) }) }); function toggle_dropdown() { var a = document.getElementById("wcmlim_backend_order_edit"); a.style.display = "none" === a.style.display ? "block" : "none" }