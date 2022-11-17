jQuery(document).ready((e) => {
    e("#updateAllorder").on("click", () => {
        e.ajax({
            url: multi_inventory.ajaxurl,
            type: "post",
            data: { action: "update_order_data" },
            beforeSend() {
                e("#pup_loader").show(), e("#pup_loader").find(".spinner").css("visibility", "visible");
            },
            success(e) {
                e && alertify.success(e);
            },
            complete(a) {
                e("#pup_loader").hide();
            },
        });
    });
});
