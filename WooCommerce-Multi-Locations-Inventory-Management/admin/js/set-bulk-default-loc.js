(function ($) {
  $(document).on("click", "#assignitloc", function (e) {
    e.preventDefault();

    if ($("body").hasClass("post-type-product")) {
      var sele = $("#bulk_default_selection").val();
      var selected = $("#bulk_default_selection").find("option:selected");
      var TermData = selected.data("termid");
      if (sele == -1) {
        alertify.error("Choose location from dropdown..");
        return true;
      }

      var productIDs = $(".posts > #the-list input[type=checkbox]:checked")
        .map(function () {
          return $(this).attr("value");
        })
        .get();

      if (productIDs.length == 0) {
        alertify.error("Select at least one Product..");
        return true;
      }

      productIDs.forEach((productid) => {
        var dataa = {
          action: "bulk_assign_default_location",
          productids: productid,
          selected: TermData,
          type: "product",
        };

        $.ajax({
          type: "POST",
          url: multi_inventory.ajaxurl,
          data: dataa,
          success: function (response) {
            if (response == "success") {
              alertify.success("location assigned");
              var temp = 'cb-select-' + productid;
              document.getElementById(temp).checked = false;

            }
            if (response == "fail") {
              alertify.error("something went wrong...!");
            }
          },
        });
      });
    }

    if ($("body").hasClass("users-php")) {
      var sel = $("#bulk_default_selection").val();
      if (sel == -1) {
        alertify.error("Choose location from dropdown..");
        return true;
      }

      alert("you are on users list page");
      var userIDs = $(".users > #the-list input[type=checkbox]:checked")
        .map(function () {
          return $(this).attr("value");
        })
        .get();

      if (userIDs.length == 0) {
        alertify.error("Select at least one user..");
        return true;
      }

      userIDs.forEach((userid) => {
        var data = {
          action: "bulk_assign_default_location",
          userids: userid,
          selected: sel,
          type: "users",
        };

        $.ajax({
          type: "POST",
          url: multi_inventory.ajaxurl,
          data: data,
          success: function (response) {
            if (response == "success") {
              alertify.success("location assigned");
            }
            if (response == "fail") {
              alertify.error("something went wrong...!");
            }
          },
        });
      });
    }
    // return false;
  });
})(jQuery);
