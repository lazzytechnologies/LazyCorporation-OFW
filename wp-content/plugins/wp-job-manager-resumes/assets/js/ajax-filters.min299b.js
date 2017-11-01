jQuery(document).ready(function(a) {
    var b = [];
    a(".searchlocation-wrapper").removeClass("select"), a(".resumes").on("update_results", function(c, d, e) {
        var f = "",
            g = a(this),
            h = g.find(".resume_filters"),
            i = g.find(".showing_resumes"),
            j = g.find(".resumes"),
            k = g.data("per_page"),
            l = g.data("orderby"),
            m = g.data("order"),
            n = g.data("featured"),
            o = a("div.resumes").index(this);
        if (b[o] && b[o].abort(), e ? a(".load_more_resumes", g).addClass("loading") : (a(j).addClass("loading"), a("li.resume, li.no_resumes_found", j).css("visibility", "hidden")), 1 == g.data("show_filters")) {
            var p = [];
            a(':input[name="filter_resume_type[]"]:checked, :input[name="filter_resume_type[]"][type="hidden"], :input[name="filter_resume_type"]', h).each(function() {
                p.push(a(this).val())
            });
            var q = h.find(':input[name^="search_categories"]').map(function() {
                    return a(this).val()
                }).get(),
                r = "",
                s = "",
                t = h.find(':input[name="search_keywords"]'),
                u = h.find(':input[name="search_location"]');
                t.val() != t.attr("placeholder") && (r = t.val()), u.val() != u.attr("placeholder") && (s = u.val());
            
                  // setdata in local storage.
                        if(s){        
                            localStorage.setItem("searchlocation", s);
                        }
                        if(q !== undefined && q !== null  && q != 0 && q != '0' ){
                            localStorage.setItem("searchcategory", q);
                        }
                        if (localStorage.getItem("filtertype")) {
                           var vlue_listtabs_filter =  localStorage.getItem("filtertype");
                            p=vlue_listtabs_filter.split(',');
                        }
                        var calnder = a('#start-date-before').val();
                        if(calnder !== "" && calnder !== undefined && calnder !== null){
                            localStorage.setItem("calendervalue", calnder);
                        }
                        
                    // getdata from local storage.   
                        if(localStorage.getItem("calendervalue")){
                            a('#start-date-before').val(localStorage.getItem("calendervalue"));
                        }
                        if (localStorage.getItem("searchlocation")) {
                            jQuery('#search_location option[value="'+localStorage.getItem("searchlocation")+'"]').prop('selected',true);
                            s = localStorage.getItem("searchlocation");
                        }
                        if (localStorage.getItem("searchcategory")) {
                            jQuery("#search_categories").val(localStorage.getItem("searchcategory")).trigger("chosen:updated");
                            q = localStorage.getItem("searchcategory");
                        }
                      
                        var f = {
                            action: "resume_manager_get_resumes",
                            search_keywords: r,
                            search_location: s,
                            search_categories: q,
                            filter_resume_type: p,
                            resume_custom_filter_flag: !0,
                            per_page: k,
                            orderby: l,
                            order: m,
                            page: d,
                            featured: n,
                            show_pagination: g.data("show_pagination"),
                            form_data: h.serialize()
                        }
                        
         } else var f = {
            action: "resume_manager_get_resumes",
            search_categories: g.data("categories").split(","),
            search_keywords: g.data("keywords"),
            search_location: g.data("location"),
            per_page: k,
            orderby: l,
            order: m,
            featured: n,
            page: d,
            show_pagination: g.data("show_pagination")
        };
        b[o] = a.ajax({
            type: "POST",
            url: resume_manager_ajax_filters.ajax_url,
            data: f,
            success: function(b) {
                if (b) try {
                    b.indexOf("\x3c!--WPJM--\x3e") >= 0 && (b = b.split("\x3c!--WPJM--\x3e")[1]), b.indexOf("\x3c!--WPJM_END--\x3e") >= 0 && (b = b.split("\x3c!--WPJM_END--\x3e")[0]);
                    var c = a.parseJSON(b);
                    c.showing ? a(i).show().html("").append("<span>" + c.showing + "</span>" + c.showing_links) : a(i).hide(), c.html && (e ? a(j).append(c.html) : a(j).html(c.html)), 1 == g.data("show_pagination") ? (g.find(".job-manager-pagination").remove(), c.pagination && g.append(c.pagination)) : (c.found_resumes && c.max_num_pages !== d ? a(".load_more_resumes", g).show().data("page", d) : a(".load_more_resumes", g).hide(), a(".load_more_resumes", g).removeClass("loading"), a("li.resume", j).css("visibility", "visible")), a(j).removeClass("loading"), g.triggerHandler("updated_results", c)
                } catch (a) {}
            }
        })
    }), a(".resumes #search_keywords, .resumes #search_location, .resumes #search_categories, .resumes #start-date-before, .resumes .resume_types :input").change(function() {
         var flag = []
        a(':input[name="filter_resume_type[]"]:checked, :input[name="filter_resume_type[]"][type="hidden"], :input[name="filter_resume_type"]', a.find(".resume_filters")).each(function() {
                flag.push(a(this).val());
            });
            localStorage.setItem("filtertype",flag);
        a(this).closest("div.resumes").triggerHandler("update_results", [1, !1])
            
    }).change(), a(".resume_filters").on("click", ".reset", function() {
        
        localStorage.clear();
        a("#start-date-before").val('');
        var b = a(this).closest("div.resumes"),
            c = a(this).closest("form");
        return c.find(':input[name="search_keywords"]').not(':input[type="hidden"]').val(""), c.find(':input[name^="search_location"]').not(':input[type="hidden"]').val("").trigger("chosen:updated"), c.find(':input[name^="search_categories"]').not(':input[type="hidden"]').val(0).trigger("chosen:updated"), a(':input[name="filter_resume_type[]"]', c).not(':input[type="hidden"]').attr("checked", "checked"), b.triggerHandler("reset"), b.triggerHandler("update_results", [1, !1]), !1
    }), a(".load_more_resumes").click(function() {
        var b = a(this).closest("div.resumes"),
            c = a(this).data("page");
        return c = c ? parseInt(c) : 1, a(this).data("page", c + 1), b.triggerHandler("update_results", [c + 1, !0]), !1
    }), a("div.resumes").on("click", ".job-manager-pagination a", function() {
        var b = a(this).closest("div.resumes"),
            c = a(this).data("page");
        return b.triggerHandler("update_results", [c, !1]), !1
    }), a.isFunction(a.fn.chosen) && (a('select[name^="search_categories"]').chosen(), a('select[name^="search_location"]').chosen())
});

