var init = {
  headroom: function() {
    var header = document.getElementById("header");
    var headroom  = new Headroom(header);
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