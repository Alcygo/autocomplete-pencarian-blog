// hoverTimeout.js
jQuery.fn.hoverTimeout = function (a, b, c, d) {
  return this.each(function () {
    var e, f = jQuery(this);
    f.hover(function () {
      clearTimeout(e);
      e = setTimeout(function () {
        b.call(f);
      }, a);
    }, function () {
      clearTimeout(e);
      e = setTimeout(function () {
        d.call(f);
      }, c);
    });
  });
};
