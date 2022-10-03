<?php $esp = get_option("wcmlim_assign_location_shop_manager");
if ($esp == "on") { ?>
  <div class="form-field term-Regional-wrap">
    <label class="" for="wcmlim_shop_regmanager"><?php esc_html_e('Location Regional Manager', 'wcmlim'); ?></label>
    <select multiple="multiple" class="multiselect" name="wcmlim_shop_regmanager[]" id="wcmlim_shop_regmanager">
      <?php
      $args = [
        'role' => 'location_regional_manager'
      ];
      $all_users = get_users($args);
      foreach ((array) $all_users as $key => $user) {
      ?>
        <option value="<?php esc_html_e($user->ID); ?>"><?php esc_html_e($user->display_name); ?></option>
      <?php } ?>
    </select>
  </div>
<?php } ?>

