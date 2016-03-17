$(function(){

  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  // Tracking the 'ontact us' buttons
  $("nav a[href='tel:+31 (0)85 4016325']").click(function() {
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'telephonelink',
      'eventAction': 'click',
      'eventLabel': 'header telephone link'
    });
  });

  $("section a[href='tel:+31 (0)85 4016325']").click(function() {
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'telephonelink',
      'eventAction': 'click',
      'eventLabel': 'in-page telephone link'
    });
  });

  $("footer a[href='tel:+31 (0)85 4016325']").click(function() {
    ga('send', {
      'hitType': 'event',
      'eventCategory': 'telephonelink',
      'eventAction': 'click',
      'eventLabel': 'footer telephone link'
    });
  });


  var hoverTimes = {};
  $("nav a[href='tel:+31 (0)85 4016325']").hover(function() {
    hoverTimes['header'] = new Date().getTime();
  },function() {
    var end = new Date().getTime();
    if (end - hoverTimes['header'] > 1000) {
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'telephonelink',
        'eventAction': 'longhover',
        'eventLabel': 'header telephone link'
      });
    }
  });

  $("section a[href='tel:+31 (0)85 4016325']").hover(function() {
    hoverTimes['header'] = new Date().getTime();
  },function() {
    var end = new Date().getTime();
    if (end - hoverTimes['header'] > 1000) {
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'telephonelink',
        'eventAction': 'longhover',
        'eventLabel': 'in-page telephone link'
      });
    }
  });

  $("footer a[href='tel:+31 (0)85 4016325']").hover(function() {
    hoverTimes['header'] = new Date().getTime();
  },function() {
    var end = new Date().getTime();
    if (end - hoverTimes['header'] > 1000) {
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'telephonelink',
        'eventAction': 'longhover',
        'eventLabel': 'footer telephone link'
      });
    }
  });

  // Parse the querystring
  document.location.queryString = {};
  document.location.search.substr(1).split("&").forEach(function (pair) {
      if (pair === "") {
        return
      }
      var parts = pair.split("=");
      if (parts[0] && parts[1]) {
        location.queryString[parts[0]] = decodeURIComponent(parts[1]).replace(/[^0-9a-zA-ZÀ-ÿ\-]/g, " ") && decodeURIComponent(parts[1].replace(/\+/g, " ")).replace(/[^0-9a-zA-ZÀ-ÿ\-]/g, " ");
      }
  });

});
