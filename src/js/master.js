var init = {
  headroom: function() {
    var header = document.getElementById("header");
    var headroom  = new Headroom(header);
    return headroom.init();    
  }
};

document.addEventListener('DOMContentLoaded', function(event) {
  init.headroom();
});