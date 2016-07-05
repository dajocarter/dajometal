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

document.addEventListener('DOMContentLoaded', function() {
  init.headroom();
  init.perfectCircles();
});

$(document).ready(function() {
  $('a.scroll, .scroll a').on('click', function(event) {
    event.preventDefault();
    $(window).stop(true).scrollTo(this.hash, {
      duration:1000, 
      interrupt:true
    });
  });

  $('.gallery-link').each(function() {
    var galleryId = $(this).attr('href');
    var slides = $(galleryId + ' .slide');
    var items = [];
    slides.each(function(idx, elt) {
      items.push({
        src: slides[idx],
        type: 'inline'
      })
    });
    $(this).magnificPopup({
      items: items,
      mainClass: 'my-mfp-zoom-in',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      }
    });
  });
});