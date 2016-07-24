$(document).ready(function() {
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
      return;
    }
  };

  init.headroom();
  init.perfectCircles();
  
  $('a.scroll, .scroll a').on('click', function(event) {
    event.preventDefault();
    $(window).stop(true).scrollTo(this.hash, {
      duration:1000,
      interrupt:true
    });
  });
  
  if (location.pathname == '/') {
    $(window).on('load resize', function() {
      var profile = document.querySelector('.profile');
      var width = profile.offsetWidth;
      profile.style.height = width + 'px';
      return;
    });
  }


  if ($(window).width() > 767) {
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
  }
});
