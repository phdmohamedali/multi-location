  jQuery(document).ready(($) => {
    $(".color_field, .map_shortcode_color_field").each(function () {
      $(this).wpColorPicker();
    });
    $(".color_field, .map_shortcode_color_field").iris({
      // a callback to fire whenever the color changes to a valid color
      change(event, ui) {
        const current_id = $(this).attr('id');
        $(".wp-picker-open").css(
          "background-color",
          $('#'+current_id).val()
        );

        const wcmlim_preview_stock_bgcolor = $(
          "#wcmlim_preview_stock_bgcolor"
        ).val();
        
        $(".Wcmlim_container").css(
          "background-color",
          wcmlim_preview_stock_bgcolor
        );
        const wcmlim_preview_stock_bordercolor = $(
          "#wcmlim_preview_stock_bordercolor"
        ).val();
        $(".Wcmlim_container").css(
          "border-color",
          wcmlim_preview_stock_bordercolor
        );
        const wcmlim_separator_linecolor = $("#wcmlim_separator_linecolor").val();
        $(".Wcmlim_prefloc_box").css("border-color", wcmlim_separator_linecolor);
        const wcmlim_txtcolor_stock_info = $("#wcmlim_txtcolor_stock_info").val();
        $(".Wcmlim_box_title").css("color", wcmlim_txtcolor_stock_info);
        const wcmlim_txtcolor_preferred_loc = $(
          "#wcmlim_txtcolor_preferred_loc"
        ).val();
        $(".loc_dd").css("color", wcmlim_txtcolor_preferred_loc);
       
        const wcmlim_txtcolor_nearest_stock = $(
          "#wcmlim_txtcolor_nearest_stock"
        ).val();
        $(".postcode-checker-title").css("color", wcmlim_txtcolor_nearest_stock);
        
        const wcmlim_oncheck_button_color = $(
          "#wcmlim_oncheck_button_color"
        ).val();
        $("#submit_postcode_product").css(
          "background-color",
          wcmlim_oncheck_button_color
        );
        const wcmlim_oncheck_button_text_color = $(
          "#wcmlim_oncheck_button_text_color"
        ).val();
        $("#submit_postcode_product").css(
          "color",
          wcmlim_oncheck_button_text_color
        );
        
        const wcmlim_soldout_button_color = $(
          "#wcmlim_soldout_button_color"
        ).val();
        $(".Wcmlim_over_stock").css(
          "background-color",
          wcmlim_soldout_button_color
        );
        const wcmlim_soldout_button_text_color = $(
          "#wcmlim_soldout_button_text_color"
        ).val();
        $(".Wcmlim_over_stock").css("color", wcmlim_soldout_button_text_color);
        const wcmlim_instock_button_color = $(
          "#wcmlim_instock_button_color"
        ).val();
        $(".Wcmlim_have_stock").css(
          "background-color",
          wcmlim_instock_button_color
        );
        const wcmlim_instock_button_text_color = $(
          "#wcmlim_instock_button_text_color"
        ).val();
        $(".Wcmlim_have_stock").css("color", wcmlim_instock_button_text_color);
        const map_shortcode_color_field = $(
          ".map_shortcode_color_field"
        ).val();          
        },
    });
    
    $("#wcmlim_preview_stock_borderoption").on("change", (_e) => {
      const wcmlim_preview_stock_borderoption = $(
        "#wcmlim_preview_stock_borderoption"
      ).val();
      $(".Wcmlim_container").css(
        "border-style",
        wcmlim_preview_stock_borderoption
      );
    });
    $("#wcmlim_preview_stock_border").on("change", (e) => {
      const wcmlim_preview_stock_border = $("#wcmlim_preview_stock_border").val();
      $(".Wcmlim_container").css("border-width", wcmlim_preview_stock_border);
    });
    $("#wcmlim_preview_stock_borderradius").on("change", (e) => {
      const wcmlim_preview_stock_borderradius = $(
        "#wcmlim_preview_stock_borderradius"
      ).val();
      $(".Wcmlim_container").css(
        "border-radius",
        wcmlim_preview_stock_borderradius
      );
    });
    $("#wcmlim_txt_stock_info").on("change", (e) => {
      const Wcmlim_box_title = $("#wcmlim_txt_stock_info").val();
      $(".Wcmlim_box_title").text(Wcmlim_box_title);
    });
    $("#wcmlim_txt_preferred_location").on("change", (e) => {
      const wcmlim_txt_preferred_location = $(
        "#wcmlim_txt_preferred_location"
      ).val();
      $(".Wcmlim_sloc_label").text(wcmlim_txt_preferred_location);
    });
    $("#wcmlim_refbox_borderradius").on("change", (e) => {
      const wcmlim_refbox_borderradius = $("#wcmlim_refbox_borderradius").val();
      $(".loc_dd.Wcmlim_prefloc_sel").css(
        "border-radius",
        wcmlim_refbox_borderradius
      );
    });
    $("#wcmlim_txt_nearest_stock_loc").on("change", (e) => {
      const wcmlim_txt_nearest_stock_loc = $(
        "#wcmlim_txt_nearest_stock_loc"
      ).val();
      $(".postcode-checker-strong").text(wcmlim_txt_nearest_stock_loc);
    });
    $("#wcmlim_oncheck_button_text").on("change", (e) => {
      const wcmlim_oncheck_button_text = $("#wcmlim_oncheck_button_text").val();
      $("#submit_postcode_product").text(wcmlim_oncheck_button_text);
    });
    $("#wcmlim_input_borderradius").on("change", (e) => {
      const wcmlim_input_borderradius = $("#wcmlim_input_borderradius").val();
      $('.postcode-checker-div input[type="text"]').css(
        "border-radius",
        wcmlim_input_borderradius
      );
    });
    $("#wcmlim_oncheck_borderradius").on("change", (e) => {
      const wcmlim_oncheck_borderradius = $("#wcmlim_oncheck_borderradius").val();
      $("#submit_postcode_product").css(
        "border-radius",
        wcmlim_oncheck_borderradius
      );
    });
    $("#wcmlim_soldout_button_text").on("change", (e) => {
      const wcmlim_soldout_button_text = $("#wcmlim_soldout_button_text").val();
      $(".Wcmlim_over_stock").text(wcmlim_soldout_button_text);
    });
    $("#wcmlim_soldout_borderradius").on("change", (e) => {
      const wcmlim_soldout_borderradius = $("#wcmlim_soldout_borderradius").val();
      $(".Wcmlim_over_stock").css("border-radius", wcmlim_soldout_borderradius);
    });
    $("#wcmlim_instock_button_text").on("change", (e) => {
      const wcmlim_instock_button_text = $("#wcmlim_instock_button_text").val();
      $(".Wcmlim_have_stock").text(wcmlim_instock_button_text);
    });
    $("#wcmlim_instock_borderradius").on("change", (e) => {
      const wcmlim_instock_borderradius = $("#wcmlim_instock_borderradius").val();
      $(".Wcmlim_have_stock").css("border-radius", wcmlim_instock_borderradius);
    });
    $("#wcmlim_preview_stock_borderoption").on("change", (e) => {
      const wcmlim_preview_stock_borderoption = $(
        "#wcmlim_preview_stock_borderoption"
      ).val();
      $(".Wcmlim_container").css(
        "border-style",
        wcmlim_preview_stock_borderoption
      );
    });

    $("#stock_availabe").hide();
    $(".Wcmlim_mssgerro").hide();
    $("#not_stock_availabe").hide();
    $("#losm").hide();
    $("#globMsg").hide();
    $(".postcode-location-distance").hide();
    $(".class_post_code").val("");
    $("#select_location").on("change", function (e) {
      const selectedValue = $(this).find("option:selected").val();
      if (selectedValue == "0") {
        $(".Wcmlim_mssgerro").hide();
        $("#not_stock_availabe").hide();
        $("#losm").hide();
        $("#globMsg").show();
        $("#stock_availabe").show();
        $(".postcode-location-distance").hide();
        $(".class_post_code").val("");
      }
      if (selectedValue == "1") {
        $("#not_stock_availabe").show();
        $("#stock_availabe").hide();
        $(".Wcmlim_mssgerro").hide();
        $("#losm").show();
        $("#globMsg").hide();
        $(".postcode-location-distance").hide();
        $(".class_post_code").val("");
      }
      if (selectedValue == "-1") {
        $(".Wcmlim_mssgerro").hide();
        $("#stock_availabe").hide();
        $("#not_stock_availabe").hide();
        $("#losm").hide();
        $("#globMsg").hide();
        $(".postcode-location-distance").hide();
        $(".class_post_code").val("");
      }
    });
    $(document).on("click", ".submit_postcode", (e) => {
      e.preventDefault();
      const postal_code = $(".class_post_code").val();
      if (postal_code == "location 1") {
        $("#not_stock_availabe").hide();
        $("#stock_availabe").show();
        $(".Wcmlim_mssgerro").hide();
        $("#losm").hide();
        $("#globMsg").show();
        $(".postcode-location-distance").show();
      } else if (postal_code == "location 2") {
        $("#not_stock_availabe").show();
        $("#stock_availabe").hide();
        $(".Wcmlim_mssgerro").hide();
        $("#losm").show();
        $("#globMsg").hide();
        $(".postcode-location-distance").show();
      } else {
        $(".Wcmlim_mssgerro").show();
        $("#not_stock_availabe").hide();
        $("#stock_availabe").hide();
        $("#losm").hide();
        $("#globMsg").hide();
        $(".postcode-location-distance").hide();
      }
    });
  });
