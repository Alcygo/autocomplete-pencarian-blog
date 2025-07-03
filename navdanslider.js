$('.slider-wrapper .HTML .widget-content').each(function () {
  var cat = $(this).find("div").attr("data-label"),
    num = $(this).find("div").attr("data-results"),
    b1 = "recent",
    b2 = "label",
    box = $(this).find("div").attr("class");

  if (box.match(b1)) {
    $.ajax({
      url: "/feeds/posts/default?alt=json-in-script&max-results=" + num,
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var url = "";
        var featcode = '<div id="featured-slider"><ul class="slides">';
        for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              url = data.feed.entry[i].link[j].href;
              break;
            }
          }

          var title = data.feed.entry[i].title.$t;
          var get_date = data.feed.entry[i].published.$t,
            year = get_date.substring(0, 4),
            month = get_date.substring(5, 7),
            day = get_date.substring(8, 10),
            date = MONTH_FORMAT[parseInt(month, 10)] + ' ' + day + ', ' + year;
          var content = data.feed.entry[i].content.$t;
          var $content = $('<div>').html(content);
          var image = NO_IMAGE;

          if (content.indexOf("youtube.com/embed/") > -1) {
            image = data.feed.entry[i].media$thumbnail.url;
          } else if (content.indexOf("<img") > -1) {
            image = $content.find('img:first').attr('src');
          }

          featcode += '<li><a class="slider-img" href="' + url + '"><div class="feets" style="background-image:url(' + image + ');"></div></a><div class="slide-cap"><h1 class="post-title"><a href="' + url + '">' + title + '</a></h1><span class="feat-divider"></span><span class="post-date">' + date + '</span></div><div class="slide-cap-bg"></div><a href="' + url + '" class="slide-overlay"></a></li>';
        }
        featcode += '</ul><div id="slider-nav"/></div>';

        $('.slider-wrapper .HTML .widget-content').each(function () {
          if ($(this).find("div").attr("class").match("recent")) {
            $(this).html(featcode);
            $(this).removeClass('widget-content').addClass('slider-content');
            $('#featured-slider').flexslider({
              controlsContainer: '#slider-nav',
              controlNav: false,
              pauseOnAction: false,
              pauseOnHover: true,
              animation: 'fade',
              animationSpeed: 1200,
              slideshowSpeed: 7000,
              prevText: '',
              nextText: ''
            });
          }
        });
      }
    });
  } else if (box.match(b2)) {
    $.ajax({
      url: "/feeds/posts/default/-/" + cat + "?alt=json-in-script&max-results=" + num,
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var url = "";
        var featcode = '<div id="featured-slider"><ul class="slides">';
        for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              url = data.feed.entry[i].link[j].href;
              break;
            }
          }

          var title = data.feed.entry[i].title.$t;
          var get_date = data.feed.entry[i].published.$t,
            year = get_date.substring(0, 4),
            month = get_date.substring(5, 7),
            day = get_date.substring(8, 10),
            date = MONTH_FORMAT[parseInt(month, 10)] + ' ' + day + ', ' + year;
          var content = data.feed.entry[i].content.$t;
          var $content = $('<div>').html(content);
          var image = NO_IMAGE;

          if (content.indexOf("youtube.com/embed/") > -1) {
            image = data.feed.entry[i].media$thumbnail.url;
          } else if (content.indexOf("<img") > -1) {
            image = $content.find('img:first').attr('src');
          }

          featcode += '<li><a class="slider-img" href="' + url + '"><div class="feets" style="background-image:url(' + image + ');"></div></a><div class="slide-cap"><h1 class="post-title"><a href="' + url + '">' + title + '</a></h1><span class="feat-divider"></span><span class="post-date">' + date + '</span></div><div class="slide-cap-bg"></div><a href="' + url + '" class="slide-overlay"></a></li>';
        }
        featcode += '</ul><div id="slider-nav"/><span id="feat-star-bg"/><span id="feat-star"/></div>';

        $('.slider-wrapper .HTML .widget-content').each(function () {
          if ($(this).find("div").attr("class").match("label")) {
            $(this).html(featcode);
            $(this).removeClass('widget-content').addClass('slider-content');
            $('#featured-slider').flexslider({
              controlsContainer: '#slider-nav',
              controlNav: false,
              pauseOnAction: false,
              pauseOnHover: true,
              animation: 'fade',
              animationSpeed: 1200,
              slideshowSpeed: 7000,
              prevText: '',
              nextText: ''
            });
          }
        });
      }
    });
  }
});

$("#LinkList96").each(function () {
    var k = "<ul id='menu-main-nav'><li><ul class='sub-menu'>";
    $("#LinkList96 li").each(function () {
        var a = $(this).text(),
            o = a.substr(0, 1),
            p = a.substr(1);
        "_" == o
            ? (o = $(this).find("a").attr("href"), k += '<li><a href="' + o + '">' + p + "</a></li>")
            : (o = $(this).find("a").attr("href"), k += '</ul></li><li><a href="' + o + '">' + a + "</a><ul class='sub-menu'>");
    });
    k += "</ul></li></ul>";
    $(this).html(k);
    $("#LinkList96 ul").each(function () {
        var k = $(this);
        if (k.html().replace(/\s|&nbsp;/g, "").length == 0) k.remove();
    });
    $("#LinkList96 li").each(function () {
        var k = $(this);
        if (k.html().replace(/\s|&nbsp;/g, "").length == 0) k.remove();
    });
});

$(document).ready(function () {
    var hld = $("#HTML905").text();
    $("#tagline").html(hld);

    $("#menu").show();
    $("ul.sub-menu").parent("li").addClass("has-children");

    $("#menu ul li").each(function () {
        $(this).hoverTimeout(0,
            function () {
                $(this).children("ul").slideDown();
            },
            0,
            function () {
                $(this).children("ul").hide();
            });
    });

    $('#search-icon').on('click', function () {
        $('#nav-search').slideToggle(250);
    });

    $(".index .post-outer,.archive .post-outer").each(function () {
        $(this).find(".block-image .thumb a").attr("style", function (a, b) {
            return b.replace("/default.jpg", "/mqdefault.jpg")
                .replace("s72-c", "s1600")
                .replace("http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png", NO_IMAGE);
        });
    });

    $("#sidebar-wrapper .widget h2").wrap("<div class='widget-title'/>");

    $('.PopularPosts ul li img').each(function () {
        $(this).attr('src', function (i, src) {
            return src.replace('/default.jpg', '/mqdefault.jpg')
                .replace('s72-c', 's1600')
                .replace('w72-h72-p-nu', 's1600');
        });
    });

    $(".PopularPosts .item-thumbnail a").prepend('<span class="img-overlay"/>');

    $('.avatar-image-container img').each(function () {
        $(this).attr('src', function (i, src) {
            return src.replace('//img1.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s45-r/avatar.png')
                .replace('/s35', '/s45');
        });
    });

    $(window).scroll(function () {
        $('#back-to-top').fadeToggle($(this).scrollTop() > 1000);
    });

    $('#back-to-top').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $('body').addClass('img-anime');

    $(window).on('load resize scroll', function () {
        var winH = $(this).height();
        $('.box-image,.bf-thumb,.rcthumb,.PopularPosts img,.home .block-image .thumb a,.tc-thumb a,.related-thumb a,.PopularPosts .item-thumbnail a,.cmm-img').each(function () {
            var qudr = 0.1 * $(this).height();
            var omger = qudr - winH + $(this).offset().top;
            if ($(document).scrollTop() > omger) {
                $(this).addClass('img-effect');
            }
        });
    });
});

$(window).on("load", function () {
    $('.Label a,.postags a,.label-head a,.box-title h2.title a,.first-tag a,.post-tag').each(function () {
        var labelPage = $(this).attr('href');
        $(this).attr('href', labelPage + '?&max-results=' + LABEL_SEARCH_NUM);
    });
});

jQuery(document).ready(function ($) {
    $('#random-icon').each(function () {
        $.ajax({
            url: "/feeds/posts/default?alt=json-in-script",
            type: 'get',
            dataType: "jsonp",
            success: function (t) {
                t = t.feed.entry.length - 3;
                t = Math.floor(Math.random() * (t + 1));
                $.ajax({
                    url: "/feeds/posts/default?alt=json-in-script&start-index=" + t + "&max-results=1",
                    type: 'get',
                    dataType: "jsonp",
                    success: function (data) {
                        var ric = '';
                        data.feed.entry.forEach(function (entry) {
                            var url = entry.link.find(link => link.rel == "alternate").href;
                            var title = entry.title.$t;
                            ric += '<a id="radn-icon" href="' + url + '" title="' + title + '"></a>';
                        });
                        $('#random-icon').html(ric);
                        $('#radn-icon').tipsy({ gravity: 'n' });
                    }
                });
            }
        });
    });
});

$('.ready-widget .HTML .widget-content .recentcomments').each(function () {
    $.ajax({
        url: "/feeds/comments/default?alt=json-in-script&max-results=" + WIDGET_RECENT_COMMENT_NUM,
        type: 'get',
        dataType: "jsonp",
        success: function (data) {
            var cmmcode = '<ul class="cmm-widget">';
            data.feed.entry.forEach(function (entry) {
                var url = entry.link.find(link => link.rel == 'alternate').href;
                var content = entry.content?.$t || entry.summary?.$t || '';
                content = content.replace(/<\S[^>]*>/g, "").substring(0, 50) + '...';
                var title = entry.title.$t;
                var author = entry.author[0].name.$t;
                var thumburl = entry.author[0]['gd$image'].src;
                var avatar = (thumburl.includes('blank.gif') || thumburl.includes('b16-rounded.gif'))
                    ? 'http://4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png'
                    : thumburl;
                cmmcode += `<li><div class="cmm-avatar"><img class="cmm-img" src="${avatar}"/></div><a href="${url}">${author}</a><span>"${content}"</span></li>`;
            });
            cmmcode += '</ul><div class="clear"/>';
            $('.ready-widget .HTML .widget-content .recentcomments').each(function () {
                if ($(this).hasClass("recentcomments")) {
                    $(this).html(cmmcode);
                }
            });
        }
    });
});
