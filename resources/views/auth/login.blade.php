<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>SAE | Ingreso al sistema</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
    <meta content="Sistema de Administraci&oacute;n Empresarial" name="description" />
    <meta content="Code Studios" name="author" />

    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="dist/css/components.min.css" rel="stylesheet" />
    <link href="dist/css/theme.min.css" rel="stylesheet" />
    <link href="dist/css/main.min.css" rel="stylesheet" />
</head>
<body>

<div id="page-loader" class="fade in"><span class="spinner"></span></div>


<div class="login-cover">
    <div class="login-cover-image"><img src="dist/images/system/login-bg.jpg" data-id="login-cover-image"/></div>
    <div class="login-cover-bg"></div>
</div>

<div id="page-container" class="fade">

    <div class="login login-v2" data-pageload-addclass="animated flipInX">

        <div class="login-header">
            <div class="brand">
                <img src="dist/images/system/logo-sae.png" width="120" class="sae-logo" style="margin-top:-20px; margin-left: -10px;"/>
                <small style="margin-top:-10px;">Sistema de administración empresarial</small>
            </div>
            <div class="icon">
                <i class="fa fa-sign-in"></i>
            </div>
        </div>

        <div class="login-content">
            <form action="{{ url('/auth/login') }}" method="POST" class="margin-bottom-0">

                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <div class="form-group m-b-20">
                    <input type="text" class="form-control input-lg" name="username" id="username"
                           autofocus placeholder="Usuario" />
                </div>
                <div class="form-group m-b-20">
                    <input type="password" class="form-control input-lg" name="password" id="password"
                           placeholder="Contrase&ntilde;a" />
                </div>
                @if(Session::has('flash_notice'))
                    <div id="flash_notice" class="alert alert-danger" role="alert">
                        {{ Session::get('flash_notice') }}
                    </div>
                @endif
                <div class="login-buttons">
                    <button type="submit" id="login" class="btn btn-success btn-block btn-lg">Entrar</button>
                </div>
            </form>
        </div>
    </div>

</div>

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="application/javascript">
    /*
     Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.1
     Version: 1.5.0
     Author: Sean Ngu
     Website: http://www.seantheme.com/color-admin-v1.5/admin/
     */
    var IMG_THUMBNAILS = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MSAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjU5LjU0Njg3NSIgeT0iOTAiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj4xNzF4MTgwPC90ZXh0PjwvZz48L3N2Zz4=";
    var handleSlimScroll = function() {
        "use strict";
        $("[data-scrollbar=true]").each(function() {
            generateSlimScroll($(this))
        })
    };
    var generateSlimScroll = function(e) {
        var t = $(e).attr("data-height");
        t = !t ? $(e).height() : t;
        var n = {
            height: t,
            alwaysVisible: true
        };
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            n.wheelStep = 3;
            n.touchScrollStep = 100
        }
        $(e).slimScroll(n)
    };
    var handleSidebarMenu = function() {
        "use strict";
        $(".sidebar .nav > .has-sub > a").click(function() {
            var e = $(this).next(".sub-menu");
            var t = ".sidebar .nav > li.has-sub > .sub-menu";
            if ($(".page-sidebar-minified").length === 0) {
                $(t).not(e).slideUp(250, function() {
                    $(this).closest("li").removeClass("expand")
                });
                $(e).slideToggle(250, function() {
                    var e = $(this).closest("li");
                    if ($(e).hasClass("expand")) {
                        $(e).removeClass("expand")
                    } else {
                        $(e).addClass("expand")
                    }
                })
            }
        });
        $(".sidebar .nav > .has-sub .sub-menu li.has-sub > a").click(function() {
            if ($(".page-sidebar-minified").length === 0) {
                var e = $(this).next(".sub-menu");
                $(e).slideToggle(250)
            }
        })
    };
    var handleMobileSidebarToggle = function() {
        var e = false;
        $(".sidebar").on("click touchstart", function(t) {
            if ($(t.target).closest(".sidebar").length !== 0) {
                e = true
            } else {
                e = false;
                t.stopPropagation()
            }
        });
        $(document).on("click touchstart", function(t) {
            if ($(t.target).closest(".sidebar").length === 0) {
                e = false
            }
            if (!t.isPropagationStopped() && e !== true) {
                if ($("#page-container").hasClass("page-sidebar-toggled")) {
                    $("#page-container").removeClass("page-sidebar-toggled")
                }
                if ($(window).width() < 979) {
                    if ($("#page-container").hasClass("page-with-two-sidebar")) {
                        $("#page-container").removeClass("page-right-sidebar-toggled")
                    }
                }
            }
        });
        $("[data-click=right-sidebar-toggled]").click(function(e) {
            e.stopPropagation();
            var t = "#page-container";
            var n = "page-right-sidebar-collapsed";
            n = $(window).width() < 979 ? "page-right-sidebar-toggled" : n;
            if ($(t).hasClass(n)) {
                $(t).removeClass(n)
            } else {
                $(t).addClass(n)
            }
            if ($(window).width() < 480) {
                $("#page-container").removeClass("page-sidebar-toggled")
            }
        });
        $("[data-click=sidebar-toggled]").click(function(e) {
            e.stopPropagation();
            var t = "page-sidebar-toggled";
            var n = "#page-container";
            if ($(n).hasClass(t)) {
                $(n).removeClass(t)
            } else {
                $(n).addClass(t)
            }
            if ($(window).width() < 480) {
                $("#page-container").removeClass("page-right-sidebar-toggled")
            }
        })
    };
    var handleSidebarMinify = function() {
        $("[data-click=sidebar-minify]").click(function(e) {
            e.preventDefault();
            var t = "page-sidebar-minified";
            var n = "#page-container";
            if ($(n).hasClass(t)) {
                $(n).removeClass(t);
                if ($(n).hasClass("page-sidebar-fixed")) {
                    generateSlimScroll($('#sidebar [data-scrollbar="true"]'))
                }
            } else {
                $(n).addClass(t);
                if ($(n).hasClass("page-sidebar-fixed")) {
                    $('#sidebar [data-scrollbar="true"]').slimScroll({
                        destroy: true
                    });
                    $('#sidebar [data-scrollbar="true"]').removeAttr("style")
                }
                $("#sidebar [data-scrollbar=true]").trigger("mouseover")
            }
            $(window).trigger("resize")
        })
    };
    var handlePageContentView = function() {
        "use strict";
        $.when($("#page-loader").addClass("hide")).done(function() {
            $("#page-container").addClass("in")
        })
    };
    var handlePanelAction = function() {
        "use strict";
        $("[data-click=panel-remove]").hover(function() {
            $(this).tooltip({
                title: "Remove",
                placement: "bottom",
                trigger: "hover",
                container: "body"
            });
            $(this).tooltip("show")
        });
        $("[data-click=panel-remove]").click(function(e) {
            e.preventDefault();
            $(this).tooltip("destroy");
            $(this).closest(".panel").remove()
        });
        $("[data-click=panel-collapse]").hover(function() {
            $(this).tooltip({
                title: "Collapse / Expand",
                placement: "bottom",
                trigger: "hover",
                container: "body"
            });
            $(this).tooltip("show")
        });
        $("[data-click=panel-collapse]").click(function(e) {
            e.preventDefault();
            $(this).closest(".panel").find(".panel-body").slideToggle()
        });
        $("[data-click=panel-reload]").hover(function() {
            $(this).tooltip({
                title: "Reload",
                placement: "bottom",
                trigger: "hover",
                container: "body"
            });
            $(this).tooltip("show")
        });
        $("[data-click=panel-reload]").click(function(e) {
            e.preventDefault();
            var t = $(this).closest(".panel");
            if (!$(t).hasClass("panel-loading")) {
                var n = $(t).find(".panel-body");
                var r = '<div class="panel-loader"><span class="spinner-small"></span></div>';
                $(t).addClass("panel-loading");
                $(n).prepend(r);
                setTimeout(function() {
                    $(t).removeClass("panel-loading");
                    $(t).find(".panel-loader").remove()
                }, 2e3)
            }
        });
        $("[data-click=panel-expand]").hover(function() {
            $(this).tooltip({
                title: "Expand / Compress",
                placement: "bottom",
                trigger: "hover",
                container: "body"
            });
            $(this).tooltip("show")
        });
        $("[data-click=panel-expand]").click(function(e) {
            e.preventDefault();
            var t = $(this).closest(".panel");
            var n = $(t).find(".panel-body");
            var r = 40;
            if ($(n).length !== 0) {
                var i = $(t).offset().top;
                var s = $(n).offset().top;
                r = s - i
            }
            if ($("body").hasClass("panel-expand") && $(t).hasClass("panel-expand")) {
                $("body, .panel").removeClass("panel-expand");
                $(".panel").removeAttr("style");
                $(n).removeAttr("style")
            } else {
                $("body").addClass("panel-expand");
                $(this).closest(".panel").addClass("panel-expand");
                if ($(n).length !== 0 && r != 40) {
                    var o = 40;
                    $(t).find(" > *").each(function() {
                        var e = $(this).attr("class");
                        if (e != "panel-heading" && e != "panel-body") {
                            o += $(this).height() + 30
                        }
                    });
                    if (o != 40) {
                        $(n).css("top", o + "px")
                    }
                }
            }
            $(window).trigger("resize")
        })
    };
    var handleDraggablePanel = function() {
        "use strict";
        var e = $(".panel").parent("[class*=col]");
        var t = ".panel-heading";
        var n = ".row > [class*=col]";
        $(e).sortable({
            handle: t,
            connectWith: n,
            stop: function(e, t) {
                t.item.find(".panel-title").append('<i class="fa fa-refresh fa-spin m-l-5" data-id="title-spinner"></i>');
                handleSavePanelPosition(t.item)
            }
        })
    };
    var handelTooltipPopoverActivation = function() {
        "use strict";
        $("[data-toggle=tooltip]").tooltip();
        $("[data-toggle=popover]").popover()
    };
    var handleScrollToTopButton = function() {
        "use strict";
        $(document).scroll(function() {
            var e = $(document).scrollTop();
            if (e >= 200) {
                $("[data-click=scroll-top]").addClass("in")
            } else {
                $("[data-click=scroll-top]").removeClass("in")
            }
        });
        $("[data-click=scroll-top]").click(function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: $("body").offset().top
            }, 500)
        })
    };

    var handleAfterPageLoadAddClass = function() {
        if ($("[data-pageload-addclass]").length !== 0) {
            $(window).load(function() {
                $("[data-pageload-addclass]").each(function() {
                    var e = $(this).attr("data-pageload-addclass");
                    $(this).addClass(e)
                })
            })
        }
    };
    var handleSavePanelPosition = function(e) {
        "use strict";
        if ($(".ui-sortable").length !== 0) {
            var t = [];
            var n = 0;
            $.when($(".ui-sortable").each(function() {
                var e = $(this).find("[data-sortable-id]");
                if (e.length !== 0) {
                    var r = [];
                    $(e).each(function() {
                        var e = $(this).attr("data-sortable-id");
                        r.push({
                            id: e
                        })
                    });
                    t.push(r)
                } else {
                    t.push([])
                }
                n++
            })).done(function() {
                var n = window.location.href;
                n = n.split("?");
                n = n[0];
                localStorage.setItem(n, JSON.stringify(t));
                $(e).find('[data-id="title-spinner"]').delay(500).fadeOut(500, function() {
                    $(this).remove()
                })
            })
        }
    };

    var launchFullScreen = function() {
        if(document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if(document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if(document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if(document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    }

    var handleBootstrapWizards = function() {
        "use strict";
        $("#wizard").bwizard()
    };
    var FormWizard = function() {
        "use strict";
        return {
            init: function() {
                handleBootstrapWizards()
            }
        }
    }();


    var App = function() {
        "use strict";
        return {
            init: function() {
                handleDraggablePanel();
                handleSlimScroll();
                handleSidebarMenu();
                handleMobileSidebarToggle();
                handleSidebarMinify();
                handleAfterPageLoadAddClass();
                handlePanelAction();
                handelTooltipPopoverActivation();
                handleScrollToTopButton();
                handlePageContentView();
            }
        }
    }()

    var handleLoginPageChangeBackground=function(){$('[data-click="change-bg"]').on("click", null, function(){var e='[data-id="login-cover-image"]';var t=$(this).find("img").attr("src");var n='<img src="'+t+'" data-id="login-cover-image" />';$(".login-cover-image").prepend(n);$(e).not('[src="'+t+'"]').fadeOut("slow",function(){$(this).remove()});$('[data-click="change-bg"]').closest("li").removeClass("active");$(this).closest("li").addClass("active")})};var LoginV2=function(){"use strict";return{init:function(){handleLoginPageChangeBackground()}}}()
</script>

<script>
    $(document).ready(function() {

        handleAfterPageLoadAddClass();

        handlePageContentView();
    });
</script>
</body>
</html>
