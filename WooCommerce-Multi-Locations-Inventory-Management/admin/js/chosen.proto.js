/* Chosen v1.8.7 | (c) 2011-2018 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */

(function () {
    var e,
        t,
        s = function (e, t) {
            return function () {
                return e.apply(t, arguments);
            };
        },
        i = function (e, t) {
            function s() {
                this.constructor = e;
            }
            for (var i in t) r.call(t, i) && (e[i] = t[i]);
            return (s.prototype = t.prototype), (e.prototype = new s()), (e.__super__ = t.prototype), e;
        },
        r = {}.hasOwnProperty;
    ((t = (function () {
        function e() {
            (this.options_index = 0), (this.parsed = []);
        }
        return (
            (e.prototype.add_node = function (e) {
                return "OPTGROUP" === e.nodeName.toUpperCase() ? this.add_group(e) : this.add_option(e);
            }),
            (e.prototype.add_group = function (e) {
                var t, s, i, r, n, o;
                for (
                    t = this.parsed.length,
                        this.parsed.push({ array_index: t, group: !0, label: e.label, title: e.title ? e.title : void 0, children: 0, disabled: e.disabled, classes: e.className }),
                        o = [],
                        s = 0,
                        i = (n = e.childNodes).length;
                    s < i;
                    s++
                )
                    (r = n[s]), o.push(this.add_option(r, t, e.disabled));
                return o;
            }),
            (e.prototype.add_option = function (e, t, s) {
                if ("OPTION" === e.nodeName.toUpperCase())
                    return (
                        "" !== e.text
                            ? (null != t && (this.parsed[t].children += 1),
                              this.parsed.push({
                                  array_index: this.parsed.length,
                                  options_index: this.options_index,
                                  value: e.value,
                                  text: e.text,
                                  html: e.innerHTML,
                                  title: e.title ? e.title : void 0,
                                  selected: e.selected,
                                  disabled: !0 === s ? s : e.disabled,
                                  group_array_index: t,
                                  group_label: null != t ? this.parsed[t].label : null,
                                  classes: e.className,
                                  style: e.style.cssText,
                              }))
                            : this.parsed.push({ array_index: this.parsed.length, options_index: this.options_index, empty: !0 }),
                        (this.options_index += 1)
                    );
            }),
            e
        );
    })()).select_to_array = function (e) {
        var s, i, r, n, o;
        for (n = new t(), i = 0, r = (o = e.childNodes).length; i < r; i++) (s = o[i]), n.add_node(s);
        return n.parsed;
    }),
        (e = (function () {
            function e(t, i) {
                (this.form_field = t),
                    (this.options = null != i ? i : {}),
                    (this.label_click_handler = s(this.label_click_handler, this)),
                    e.browser_is_supported() && ((this.is_multiple = this.form_field.multiple), this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready());
            }
            return (
                (e.prototype.set_default_values = function () {
                    return (
                        (this.click_test_action = (function (e) {
                            return function (t) {
                                return e.test_active_click(t);
                            };
                        })(this)),
                        (this.activate_action = (function (e) {
                            return function (t) {
                                return e.activate_field(t);
                            };
                        })(this)),
                        (this.active_field = !1),
                        (this.mouse_on_container = !1),
                        (this.results_showing = !1),
                        (this.result_highlighted = null),
                        (this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className)),
                        (this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect),
                        (this.disable_search_threshold = this.options.disable_search_threshold || 0),
                        (this.disable_search = this.options.disable_search || !1),
                        (this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search),
                        (this.group_search = null == this.options.group_search || this.options.group_search),
                        (this.search_contains = this.options.search_contains || !1),
                        (this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete),
                        (this.max_selected_options = this.options.max_selected_options || 1 / 0),
                        (this.inherit_select_classes = this.options.inherit_select_classes || !1),
                        (this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options),
                        (this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options),
                        (this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1),
                        (this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY),
                        (this.case_sensitive_search = this.options.case_sensitive_search || !1),
                        (this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select)
                    );
                }),
                (e.prototype.set_default_text = function () {
                    return (
                        this.form_field.getAttribute("data-placeholder")
                            ? (this.default_text = this.form_field.getAttribute("data-placeholder"))
                            : this.is_multiple
                            ? (this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || e.default_multiple_text)
                            : (this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || e.default_single_text),
                        (this.default_text = this.escape_html(this.default_text)),
                        (this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || e.default_no_result_text)
                    );
                }),
                (e.prototype.choice_label = function (e) {
                    return this.include_group_label_in_selected && null != e.group_label ? "<b class='group-name'>" + this.escape_html(e.group_label) + "</b>" + e.html : e.html;
                }),
                (e.prototype.mouse_enter = function () {
                    return (this.mouse_on_container = !0);
                }),
                (e.prototype.mouse_leave = function () {
                    return (this.mouse_on_container = !1);
                }),
                (e.prototype.input_focus = function (e) {
                    if (this.is_multiple) {
                        if (!this.active_field)
                            return setTimeout(
                                (function (e) {
                                    return function () {
                                        return e.container_mousedown();
                                    };
                                })(this),
                                50
                            );
                    } else if (!this.active_field) return this.activate_field();
                }),
                (e.prototype.input_blur = function (e) {
                    if (!this.mouse_on_container)
                        return (
                            (this.active_field = !1),
                            setTimeout(
                                (function (e) {
                                    return function () {
                                        return e.blur_test();
                                    };
                                })(this),
                                100
                            )
                        );
                }),
                (e.prototype.label_click_handler = function (e) {
                    return this.is_multiple ? this.container_mousedown(e) : this.activate_field();
                }),
                (e.prototype.results_option_build = function (e) {
                    var t, s, i, r, n, o, l;
                    for (
                        t = "", l = 0, r = 0, n = (o = this.results_data).length;
                        r < n &&
                        ((s = o[r]),
                        (i = ""),
                        "" !== (i = s.group ? this.result_add_group(s) : this.result_add_option(s)) && (l++, (t += i)),
                        (null != e ? e.first : void 0) && (s.selected && this.is_multiple ? this.choice_build(s) : s.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(s))),
                        !(l >= this.max_shown_results));
                        r++
                    );
                    return t;
                }),
                (e.prototype.result_add_option = function (e) {
                    var t, s;
                    return e.search_match && this.include_option_in_results(e)
                        ? ((t = []),
                          e.disabled || (e.selected && this.is_multiple) || t.push("active-result"),
                          !e.disabled || (e.selected && this.is_multiple) || t.push("disabled-result"),
                          e.selected && t.push("result-selected"),
                          null != e.group_array_index && t.push("group-option"),
                          "" !== e.classes && t.push(e.classes),
                          (s = document.createElement("li")),
                          (s.className = t.join(" ")),
                          e.style && (s.style.cssText = e.style),
                          s.setAttribute("data-option-array-index", e.array_index),
                          (s.innerHTML = e.highlighted_html || e.html),
                          e.title && (s.title = e.title),
                          this.outerHTML(s))
                        : "";
                }),
                (e.prototype.result_add_group = function (e) {
                    var t, s;
                    return (e.search_match || e.group_match) && e.active_options > 0
                        ? ((t = []).push("group-result"),
                          e.classes && t.push(e.classes),
                          (s = document.createElement("li")),
                          (s.className = t.join(" ")),
                          (s.innerHTML = e.highlighted_html || this.escape_html(e.label)),
                          e.title && (s.title = e.title),
                          this.outerHTML(s))
                        : "";
                }),
                (e.prototype.results_update_field = function () {
                    if ((this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing)) return this.winnow_results();
                }),
                (e.prototype.reset_single_select_options = function () {
                    var e, t, s, i, r;
                    for (r = [], e = 0, t = (s = this.results_data).length; e < t; e++) (i = s[e]).selected ? r.push((i.selected = !1)) : r.push(void 0);
                    return r;
                }),
                (e.prototype.results_toggle = function () {
                    return this.results_showing ? this.results_hide() : this.results_show();
                }),
                (e.prototype.results_search = function (e) {
                    return this.results_showing ? this.winnow_results() : this.results_show();
                }),
                (e.prototype.winnow_results = function (e) {
                    var t, s, i, r, n, o, l, h, c, a, _, u, d, p, f;
                    for (this.no_results_clear(), a = 0, t = (l = this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), c = this.get_search_regex(t), i = 0, r = (h = this.results_data).length; i < r; i++)
                        ((n = h[i]).search_match = !1),
                            (_ = null),
                            (u = null),
                            (n.highlighted_html = ""),
                            this.include_option_in_results(n) &&
                                (n.group && ((n.group_match = !1), (n.active_options = 0)),
                                null != n.group_array_index && this.results_data[n.group_array_index] && (0 === (_ = this.results_data[n.group_array_index]).active_options && _.search_match && (a += 1), (_.active_options += 1)),
                                (f = n.group ? n.label : n.text),
                                (n.group && !this.group_search) ||
                                    ((u = this.search_string_match(f, c)),
                                    (n.search_match = null != u),
                                    n.search_match && !n.group && (a += 1),
                                    n.search_match
                                        ? (l.length &&
                                              ((d = u.index),
                                              (o = f.slice(0, d)),
                                              (s = f.slice(d, d + l.length)),
                                              (p = f.slice(d + l.length)),
                                              (n.highlighted_html = this.escape_html(o) + "<em>" + this.escape_html(s) + "</em>" + this.escape_html(p))),
                                          null != _ && (_.group_match = !0))
                                        : null != n.group_array_index && this.results_data[n.group_array_index].search_match && (n.search_match = !0)));
                    return (
                        this.result_clear_highlight(),
                        a < 1 && l.length
                            ? (this.update_results_content(""), this.no_results(l))
                            : (this.update_results_content(this.results_option_build()), (null != e ? e.skip_highlight : void 0) ? void 0 : this.winnow_results_set_highlight())
                    );
                }),
                (e.prototype.get_search_regex = function (e) {
                    var t, s;
                    return (s = this.search_contains ? e : "(^|\\s|\\b)" + e + "[^\\s]*"), this.enable_split_word_search || this.search_contains || (s = "^" + s), (t = this.case_sensitive_search ? "" : "i"), new RegExp(s, t);
                }),
                (e.prototype.search_string_match = function (e, t) {
                    var s;
                    return (s = t.exec(e)), !this.search_contains && (null != s ? s[1] : void 0) && (s.index += 1), s;
                }),
                (e.prototype.choices_count = function () {
                    var e, t, s;
                    if (null != this.selected_option_count) return this.selected_option_count;
                    for (this.selected_option_count = 0, e = 0, t = (s = this.form_field.options).length; e < t; e++) s[e].selected && (this.selected_option_count += 1);
                    return this.selected_option_count;
                }),
                (e.prototype.choices_click = function (e) {
                    if ((e.preventDefault(), this.activate_field(), !this.results_showing && !this.is_disabled)) return this.results_show();
                }),
                (e.prototype.keydown_checker = function (e) {
                    var t, s;
                    switch (((s = null != (t = e.which) ? t : e.keyCode), this.search_field_scale(), 8 !== s && this.pending_backstroke && this.clear_backstroke(), s)) {
                        case 8:
                            this.backstroke_length = this.get_search_field_value().length;
                            break;
                        case 9:
                            this.results_showing && !this.is_multiple && this.result_select(e), (this.mouse_on_container = !1);
                            break;
                        case 13:
                        case 27:
                            this.results_showing && e.preventDefault();
                            break;
                        case 32:
                            this.disable_search && e.preventDefault();
                            break;
                        case 38:
                            e.preventDefault(), this.keyup_arrow();
                            break;
                        case 40:
                            e.preventDefault(), this.keydown_arrow();
                    }
                }),
                (e.prototype.keyup_checker = function (e) {
                    var t, s;
                    switch (((s = null != (t = e.which) ? t : e.keyCode), this.search_field_scale(), s)) {
                        case 8:
                            this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0 ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
                            break;
                        case 13:
                            e.preventDefault(), this.results_showing && this.result_select(e);
                            break;
                        case 27:
                            this.results_showing && this.results_hide();
                            break;
                        case 9:
                        case 16:
                        case 17:
                        case 18:
                        case 38:
                        case 40:
                        case 91:
                            break;
                        default:
                            this.results_search();
                    }
                }),
                (e.prototype.clipboard_event_checker = function (e) {
                    if (!this.is_disabled)
                        return setTimeout(
                            (function (e) {
                                return function () {
                                    return e.results_search();
                                };
                            })(this),
                            50
                        );
                }),
                (e.prototype.container_width = function () {
                    return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px";
                }),
                (e.prototype.include_option_in_results = function (e) {
                    return !(this.is_multiple && !this.display_selected_options && e.selected) && !(!this.display_disabled_options && e.disabled) && !e.empty;
                }),
                (e.prototype.search_results_touchstart = function (e) {
                    return (this.touch_started = !0), this.search_results_mouseover(e);
                }),
                (e.prototype.search_results_touchmove = function (e) {
                    return (this.touch_started = !1), this.search_results_mouseout(e);
                }),
                (e.prototype.search_results_touchend = function (e) {
                    if (this.touch_started) return this.search_results_mouseup(e);
                }),
                (e.prototype.outerHTML = function (e) {
                    var t;
                    return e.outerHTML ? e.outerHTML : ((t = document.createElement("div")).appendChild(e), t.innerHTML);
                }),
                (e.prototype.get_single_html = function () {
                    return (
                        '<a class="chosen-single chosen-default">\n  <span>' +
                        this.default_text +
                        '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
                    );
                }),
                (e.prototype.get_multi_html = function () {
                    return (
                        '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' +
                        this.default_text +
                        '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
                    );
                }),
                (e.prototype.get_no_results_html = function (e) {
                    return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + this.escape_html(e) + "</span>\n</li>";
                }),
                (e.browser_is_supported = function () {
                    return "Microsoft Internet Explorer" === window.navigator.appName
                        ? document.documentMode >= 8
                        : !(
                              /iP(od|hone)/i.test(window.navigator.userAgent) ||
                              /IEMobile/i.test(window.navigator.userAgent) ||
                              /Windows Phone/i.test(window.navigator.userAgent) ||
                              /BlackBerry/i.test(window.navigator.userAgent) ||
                              /BB10/i.test(window.navigator.userAgent) ||
                              /Android.*Mobile/i.test(window.navigator.userAgent)
                          );
                }),
                (e.default_multiple_text = "Select Some Options"),
                (e.default_single_text = "Select an Option"),
                (e.default_no_result_text = "No results match"),
                e
            );
        })()),
        (this.Chosen = (function (s) {
            function r() {
                return r.__super__.constructor.apply(this, arguments);
            }
            var n;
            return (
                i(r, e),
                (r.prototype.setup = function () {
                    return (this.current_selectedIndex = this.form_field.selectedIndex);
                }),
                (r.prototype.set_up_html = function () {
                    var e, t;
                    return (
                        (e = ["chosen-container"]).push("chosen-container-" + (this.is_multiple ? "multi" : "single")),
                        this.inherit_select_classes && this.form_field.className && e.push(this.form_field.className),
                        this.is_rtl && e.push("chosen-rtl"),
                        (t = { class: e.join(" "), title: this.form_field.title }),
                        this.form_field.id.length && (t.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"),
                        (this.container = new Element("div", t)),
                        this.container.setStyle({ width: this.container_width() }),
                        this.is_multiple ? this.container.update(this.get_multi_html()) : this.container.update(this.get_single_html()),
                        this.form_field.hide().insert({ after: this.container }),
                        (this.dropdown = this.container.down("div.chosen-drop")),
                        (this.search_field = this.container.down("input")),
                        (this.search_results = this.container.down("ul.chosen-results")),
                        this.search_field_scale(),
                        (this.search_no_results = this.container.down("li.no-results")),
                        this.is_multiple
                            ? ((this.search_choices = this.container.down("ul.chosen-choices")), (this.search_container = this.container.down("li.search-field")))
                            : ((this.search_container = this.container.down("div.chosen-search")), (this.selected_item = this.container.down(".chosen-single"))),
                        this.results_build(),
                        this.set_tab_index(),
                        this.set_label_behavior()
                    );
                }),
                (r.prototype.on_ready = function () {
                    return this.form_field.fire("chosen:ready", { chosen: this });
                }),
                (r.prototype.register_observers = function () {
                    return (
                        this.container.observe(
                            "touchstart",
                            (function (e) {
                                return function (t) {
                                    return e.container_mousedown(t);
                                };
                            })(this)
                        ),
                        this.container.observe(
                            "touchend",
                            (function (e) {
                                return function (t) {
                                    return e.container_mouseup(t);
                                };
                            })(this)
                        ),
                        this.container.observe(
                            "mousedown",
                            (function (e) {
                                return function (t) {
                                    return e.container_mousedown(t);
                                };
                            })(this)
                        ),
                        this.container.observe(
                            "mouseup",
                            (function (e) {
                                return function (t) {
                                    return e.container_mouseup(t);
                                };
                            })(this)
                        ),
                        this.container.observe(
                            "mouseenter",
                            (function (e) {
                                return function (t) {
                                    return e.mouse_enter(t);
                                };
                            })(this)
                        ),
                        this.container.observe(
                            "mouseleave",
                            (function (e) {
                                return function (t) {
                                    return e.mouse_leave(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "mouseup",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_mouseup(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "mouseover",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_mouseover(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "mouseout",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_mouseout(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "mousewheel",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_mousewheel(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "DOMMouseScroll",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_mousewheel(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "touchstart",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_touchstart(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "touchmove",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_touchmove(t);
                                };
                            })(this)
                        ),
                        this.search_results.observe(
                            "touchend",
                            (function (e) {
                                return function (t) {
                                    return e.search_results_touchend(t);
                                };
                            })(this)
                        ),
                        this.form_field.observe(
                            "chosen:updated",
                            (function (e) {
                                return function (t) {
                                    return e.results_update_field(t);
                                };
                            })(this)
                        ),
                        this.form_field.observe(
                            "chosen:activate",
                            (function (e) {
                                return function (t) {
                                    return e.activate_field(t);
                                };
                            })(this)
                        ),
                        this.form_field.observe(
                            "chosen:open",
                            (function (e) {
                                return function (t) {
                                    return e.container_mousedown(t);
                                };
                            })(this)
                        ),
                        this.form_field.observe(
                            "chosen:close",
                            (function (e) {
                                return function (t) {
                                    return e.close_field(t);
                                };
                            })(this)
                        ),
                        this.search_field.observe(
                            "blur",
                            (function (e) {
                                return function (t) {
                                    return e.input_blur(t);
                                };
                            })(this)
                        ),
                        this.search_field.observe(
                            "keyup",
                            (function (e) {
                                return function (t) {
                                    return e.keyup_checker(t);
                                };
                            })(this)
                        ),
                        this.search_field.observe(
                            "keydown",
                            (function (e) {
                                return function (t) {
                                    return e.keydown_checker(t);
                                };
                            })(this)
                        ),
                        this.search_field.observe(
                            "focus",
                            (function (e) {
                                return function (t) {
                                    return e.input_focus(t);
                                };
                            })(this)
                        ),
                        this.search_field.observe(
                            "cut",
                            (function (e) {
                                return function (t) {
                                    return e.clipboard_event_checker(t);
                                };
                            })(this)
                        ),
                        this.search_field.observe(
                            "paste",
                            (function (e) {
                                return function (t) {
                                    return e.clipboard_event_checker(t);
                                };
                            })(this)
                        ),
                        this.is_multiple
                            ? this.search_choices.observe(
                                  "click",
                                  (function (e) {
                                      return function (t) {
                                          return e.choices_click(t);
                                      };
                                  })(this)
                              )
                            : this.container.observe("click", function (e) {
                                  return e.preventDefault();
                              })
                    );
                }),
                (r.prototype.destroy = function () {
                    var e, t, s, i;
                    for (this.container.ownerDocument.stopObserving("click", this.click_test_action), t = 0, s = (i = ["chosen:updated", "chosen:activate", "chosen:open", "chosen:close"]).length; t < s; t++)
                        (e = i[t]), this.form_field.stopObserving(e);
                    return (
                        this.container.stopObserving(),
                        this.search_results.stopObserving(),
                        this.search_field.stopObserving(),
                        null != this.form_field_label && this.form_field_label.stopObserving(),
                        this.is_multiple
                            ? (this.search_choices.stopObserving(),
                              this.container.select(".search-choice-close").each(function (e) {
                                  return e.stopObserving();
                              }))
                            : this.selected_item.stopObserving(),
                        this.search_field.tabIndex && (this.form_field.tabIndex = this.search_field.tabIndex),
                        this.container.remove(),
                        this.form_field.show()
                    );
                }),
                (r.prototype.search_field_disabled = function () {
                    var e;
                    return (
                        (this.is_disabled = this.form_field.disabled || (null != (e = this.form_field.up("fieldset")) ? e.disabled : void 0) || !1),
                        this.is_disabled ? this.container.addClassName("chosen-disabled") : this.container.removeClassName("chosen-disabled"),
                        (this.search_field.disabled = this.is_disabled),
                        this.is_multiple || this.selected_item.stopObserving("focus", this.activate_field),
                        this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.observe("focus", this.activate_field)
                    );
                }),
                (r.prototype.container_mousedown = function (e) {
                    var t;
                    if (!this.is_disabled)
                        return (
                            !e || ("mousedown" !== (t = e.type) && "touchstart" !== t) || this.results_showing || e.preventDefault(),
                            null != e && e.target.hasClassName("search-choice-close")
                                ? void 0
                                : (this.active_field
                                      ? this.is_multiple || !e || (e.target !== this.selected_item && !e.target.up("a.chosen-single")) || this.results_toggle()
                                      : (this.is_multiple && this.search_field.clear(), this.container.ownerDocument.observe("click", this.click_test_action), this.results_show()),
                                  this.activate_field())
                        );
                }),
                (r.prototype.container_mouseup = function (e) {
                    if ("ABBR" === e.target.nodeName && !this.is_disabled) return this.results_reset(e);
                }),
                (r.prototype.search_results_mousewheel = function (e) {
                    var t;
                    if (null != (t = e.deltaY || -e.wheelDelta || e.detail)) return e.preventDefault(), "DOMMouseScroll" === e.type && (t *= 40), (this.search_results.scrollTop = t + this.search_results.scrollTop);
                }),
                (r.prototype.blur_test = function (e) {
                    if (!this.active_field && this.container.hasClassName("chosen-container-active")) return this.close_field();
                }),
                (r.prototype.close_field = function () {
                    return (
                        this.container.ownerDocument.stopObserving("click", this.click_test_action),
                        (this.active_field = !1),
                        this.results_hide(),
                        this.container.removeClassName("chosen-container-active"),
                        this.clear_backstroke(),
                        this.show_search_field_default(),
                        this.search_field_scale(),
                        this.search_field.blur()
                    );
                }),
                (r.prototype.activate_field = function () {
                    if (!this.is_disabled) return this.container.addClassName("chosen-container-active"), (this.active_field = !0), (this.search_field.value = this.get_search_field_value()), this.search_field.focus();
                }),
                (r.prototype.test_active_click = function (e) {
                    return e.target.up(".chosen-container") === this.container ? (this.active_field = !0) : this.close_field();
                }),
                (r.prototype.results_build = function () {
                    return (
                        (this.parsing = !0),
                        (this.selected_option_count = null),
                        (this.results_data = t.select_to_array(this.form_field)),
                        this.is_multiple
                            ? this.search_choices.select("li.search-choice").invoke("remove")
                            : (this.single_set_selected_text(),
                              this.disable_search || this.form_field.options.length <= this.disable_search_threshold
                                  ? ((this.search_field.readOnly = !0), this.container.addClassName("chosen-container-single-nosearch"))
                                  : ((this.search_field.readOnly = !1), this.container.removeClassName("chosen-container-single-nosearch"))),
                        this.update_results_content(this.results_option_build({ first: !0 })),
                        this.search_field_disabled(),
                        this.show_search_field_default(),
                        this.search_field_scale(),
                        (this.parsing = !1)
                    );
                }),
                (r.prototype.result_do_highlight = function (e) {
                    var t, s, i, r, n;
                    return (
                        this.result_clear_highlight(),
                        (this.result_highlight = e),
                        this.result_highlight.addClassName("highlighted"),
                        (i = parseInt(this.search_results.getStyle("maxHeight"), 10)),
                        (n = this.search_results.scrollTop),
                        (r = i + n),
                        (s = this.result_highlight.positionedOffset().top),
                        (t = s + this.result_highlight.getHeight()) >= r ? (this.search_results.scrollTop = t - i > 0 ? t - i : 0) : s < n ? (this.search_results.scrollTop = s) : void 0
                    );
                }),
                (r.prototype.result_clear_highlight = function () {
                    return this.result_highlight && this.result_highlight.removeClassName("highlighted"), (this.result_highlight = null);
                }),
                (r.prototype.results_show = function () {
                    return this.is_multiple && this.max_selected_options <= this.choices_count()
                        ? (this.form_field.fire("chosen:maxselected", { chosen: this }), !1)
                        : (this.container.addClassName("chosen-with-drop"),
                          (this.results_showing = !0),
                          this.search_field.focus(),
                          (this.search_field.value = this.get_search_field_value()),
                          this.winnow_results(),
                          this.form_field.fire("chosen:showing_dropdown", { chosen: this }));
                }),
                (r.prototype.update_results_content = function (e) {
                    return this.search_results.update(e);
                }),
                (r.prototype.results_hide = function () {
                    return this.results_showing && (this.result_clear_highlight(), this.container.removeClassName("chosen-with-drop"), this.form_field.fire("chosen:hiding_dropdown", { chosen: this })), (this.results_showing = !1);
                }),
                (r.prototype.set_tab_index = function (e) {
                    var t;
                    if (this.form_field.tabIndex) return (t = this.form_field.tabIndex), (this.form_field.tabIndex = -1), (this.search_field.tabIndex = t);
                }),
                (r.prototype.set_label_behavior = function () {
                    if (((this.form_field_label = this.form_field.up("label")), null == this.form_field_label && (this.form_field_label = $$("label[for='" + this.form_field.id + "']").first()), null != this.form_field_label))
                        return this.form_field_label.observe("click", this.label_click_handler);
                }),
                (r.prototype.show_search_field_default = function () {
                    return this.is_multiple && this.choices_count() < 1 && !this.active_field
                        ? ((this.search_field.value = this.default_text), this.search_field.addClassName("default"))
                        : ((this.search_field.value = ""), this.search_field.removeClassName("default"));
                }),
                (r.prototype.search_results_mouseup = function (e) {
                    var t;
                    if ((t = e.target.hasClassName("active-result") ? e.target : e.target.up(".active-result"))) return (this.result_highlight = t), this.result_select(e), this.search_field.focus();
                }),
                (r.prototype.search_results_mouseover = function (e) {
                    var t;
                    if ((t = e.target.hasClassName("active-result") ? e.target : e.target.up(".active-result"))) return this.result_do_highlight(t);
                }),
                (r.prototype.search_results_mouseout = function (e) {
                    if (e.target.hasClassName("active-result") || e.target.up(".active-result")) return this.result_clear_highlight();
                }),
                (r.prototype.choice_build = function (e) {
                    var t, s;
                    return (
                        (t = new Element("li", { class: "search-choice" }).update("<span>" + this.choice_label(e) + "</span>")),
                        e.disabled
                            ? t.addClassName("search-choice-disabled")
                            : ((s = new Element("a", { href: "#", class: "search-choice-close", rel: e.array_index })).observe(
                                  "click",
                                  (function (e) {
                                      return function (t) {
                                          return e.choice_destroy_link_click(t);
                                      };
                                  })(this)
                              ),
                              t.insert(s)),
                        this.search_container.insert({ before: t })
                    );
                }),
                (r.prototype.choice_destroy_link_click = function (e) {
                    if ((e.preventDefault(), e.stopPropagation(), !this.is_disabled)) return this.choice_destroy(e.target);
                }),
                (r.prototype.choice_destroy = function (e) {
                    if (this.result_deselect(e.readAttribute("rel")))
                        return (
                            this.active_field ? this.search_field.focus() : this.show_search_field_default(),
                            this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1 && this.results_hide(),
                            e.up("li").remove(),
                            this.search_field_scale()
                        );
                }),
                (r.prototype.results_reset = function () {
                    if (
                        (this.reset_single_select_options(),
                        (this.form_field.options[0].selected = !0),
                        this.single_set_selected_text(),
                        this.show_search_field_default(),
                        this.results_reset_cleanup(),
                        this.trigger_form_field_change(),
                        this.active_field)
                    )
                        return this.results_hide();
                }),
                (r.prototype.results_reset_cleanup = function () {
                    var e;
                    if (((this.current_selectedIndex = this.form_field.selectedIndex), (e = this.selected_item.down("abbr")))) return e.remove();
                }),
                (r.prototype.result_select = function (e) {
                    var t, s;
                    if (this.result_highlight)
                        return (
                            (t = this.result_highlight),
                            this.result_clear_highlight(),
                            this.is_multiple && this.max_selected_options <= this.choices_count()
                                ? (this.form_field.fire("chosen:maxselected", { chosen: this }), !1)
                                : (this.is_multiple ? t.removeClassName("active-result") : this.reset_single_select_options(),
                                  t.addClassName("result-selected"),
                                  (s = this.results_data[t.getAttribute("data-option-array-index")]),
                                  (s.selected = !0),
                                  (this.form_field.options[s.options_index].selected = !0),
                                  (this.selected_option_count = null),
                                  this.is_multiple ? this.choice_build(s) : this.single_set_selected_text(this.choice_label(s)),
                                  this.is_multiple && (!this.hide_results_on_select || e.metaKey || e.ctrlKey)
                                      ? e.metaKey || e.ctrlKey
                                          ? this.winnow_results({ skip_highlight: !0 })
                                          : ((this.search_field.value = ""), this.winnow_results())
                                      : (this.results_hide(), this.show_search_field_default()),
                                  (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change(),
                                  (this.current_selectedIndex = this.form_field.selectedIndex),
                                  e.preventDefault(),
                                  this.search_field_scale())
                        );
                }),
                (r.prototype.single_set_selected_text = function (e) {
                    return (
                        null == e && (e = this.default_text),
                        e === this.default_text ? this.selected_item.addClassName("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClassName("chosen-default")),
                        this.selected_item.down("span").update(e)
                    );
                }),
                (r.prototype.result_deselect = function (e) {
                    var t;
                    return (
                        (t = this.results_data[e]),
                        !this.form_field.options[t.options_index].disabled &&
                            ((t.selected = !1),
                            (this.form_field.options[t.options_index].selected = !1),
                            (this.selected_option_count = null),
                            this.result_clear_highlight(),
                            this.results_showing && this.winnow_results(),
                            this.trigger_form_field_change(),
                            this.search_field_scale(),
                            !0)
                    );
                }),
                (r.prototype.single_deselect_control_build = function () {
                    if (this.allow_single_deselect)
                        return this.selected_item.down("abbr") || this.selected_item.down("span").insert({ after: '<abbr class="search-choice-close"></abbr>' }), this.selected_item.addClassName("chosen-single-with-deselect");
                }),
                (r.prototype.get_search_field_value = function () {
                    return this.search_field.value;
                }),
                (r.prototype.get_search_text = function () {
                    return this.get_search_field_value().strip();
                }),
                (r.prototype.escape_html = function (e) {
                    return e.escapeHTML();
                }),
                (r.prototype.winnow_results_set_highlight = function () {
                    var e;
                    if ((this.is_multiple || (e = this.search_results.down(".result-selected.active-result")), null == e && (e = this.search_results.down(".active-result")), null != e)) return this.result_do_highlight(e);
                }),
                (r.prototype.no_results = function (e) {
                    return this.search_results.insert(this.get_no_results_html(e)), this.form_field.fire("chosen:no_results", { chosen: this });
                }),
                (r.prototype.no_results_clear = function () {
                    var e, t;
                    for (e = null, t = []; (e = this.search_results.down(".no-results")); ) t.push(e.remove());
                    return t;
                }),
                (r.prototype.keydown_arrow = function () {
                    var e;
                    return this.results_showing && this.result_highlight ? ((e = this.result_highlight.next(".active-result")) ? this.result_do_highlight(e) : void 0) : this.results_show();
                }),
                (r.prototype.keyup_arrow = function () {
                    var e, t, s;
                    return this.results_showing || this.is_multiple
                        ? this.result_highlight
                            ? ((s = this.result_highlight.previousSiblings()),
                              (e = this.search_results.select("li.active-result")),
                              (t = s.intersect(e)).length ? this.result_do_highlight(t.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight()))
                            : void 0
                        : this.results_show();
                }),
                (r.prototype.keydown_backstroke = function () {
                    var e;
                    return this.pending_backstroke
                        ? (this.choice_destroy(this.pending_backstroke.down("a")), this.clear_backstroke())
                        : (e = this.search_container.siblings().last()) && e.hasClassName("search-choice") && !e.hasClassName("search-choice-disabled")
                        ? ((this.pending_backstroke = e),
                          this.pending_backstroke && this.pending_backstroke.addClassName("search-choice-focus"),
                          this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClassName("search-choice-focus"))
                        : void 0;
                }),
                (r.prototype.clear_backstroke = function () {
                    return this.pending_backstroke && this.pending_backstroke.removeClassName("search-choice-focus"), (this.pending_backstroke = null);
                }),
                (r.prototype.search_field_scale = function () {
                    var e, t, s, i, r, n, o, l;
                    if (this.is_multiple) {
                        for (
                            n = { position: "absolute", left: "-1000px", top: "-1000px", display: "none", whiteSpace: "pre" },
                                s = 0,
                                i = (o = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"]).length;
                            s < i;
                            s++
                        )
                            n[(r = o[s])] = this.search_field.getStyle(r);
                        return (
                            (t = new Element("div").update(this.escape_html(this.get_search_field_value()))).setStyle(n),
                            document.body.appendChild(t),
                            (l = t.measure("width") + 25),
                            t.remove(),
                            (e = this.container.getWidth()) && (l = Math.min(e - 10, l)),
                            this.search_field.setStyle({ width: l + "px" })
                        );
                    }
                }),
                (r.prototype.trigger_form_field_change = function () {
                    return n(this.form_field, "input"), n(this.form_field, "change");
                }),
                (n = function (e, t) {
                    var s;
                    if (e.dispatchEvent) {
                        try {
                            s = new Event(t, { bubbles: !0, cancelable: !0 });
                        } catch (e) {
                            (s = document.createEvent("HTMLEvents")).initEvent(t, !0, !0);
                        }
                        return e.dispatchEvent(s);
                    }
                    return e.fireEvent("on" + t, document.createEventObject());
                }),
                r
            );
        })());
}.call(this));
