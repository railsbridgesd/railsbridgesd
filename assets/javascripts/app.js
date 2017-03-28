
// JAVASCRIPTS

$(document).ready(function(){

  // Update navbar background as we scroll
  $(document).on("scroll", function(){
    var currentPos = $(this).scrollTop();

    if (currentPos > 550) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  // Scroll to section
  $('.navbar a').click(function() {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - 50
      }, 500);
      return false;
    }
  });
  
});
