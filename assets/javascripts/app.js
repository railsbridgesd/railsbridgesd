
// JAVASCRIPTS

$(document).ready(function(){

  // Update navbar background as we scroll
  $(document).on("scroll", function(){
    var currentPos = $(this).scrollTop();

    if (currentPos > 590) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });
});
