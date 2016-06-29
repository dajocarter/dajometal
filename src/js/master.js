var init = {
  headroom: function() {
    var header = document.getElementById("header");
    var headroom = new Headroom(header);
    return headroom.init();
  },
  perfectCircles: function() {
    var socialIcons = document.querySelectorAll('.social a');
    for (var i = 0; i < socialIcons.length; i++) {
      var height = socialIcons[i].offsetHeight;
      socialIcons[i].style.width = height + 'px';
    }
    return false;
  }
};

document.addEventListener('DOMContentLoaded', function(event) {
  init.headroom();
  init.perfectCircles();
});

$(document).ready(function() {
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    $(window).stop(true).scrollTo(this.hash, {
      duration:1000, 
      interrupt:true
    });
  });

  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title');
      }
    }
  });
});