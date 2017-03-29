
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

  // Post to email
  $('button[type="submit"]').on("click", function() {
    var name = $('[name="name"]').val();
    var inputEmail = $('[name="inputEmail"]').val();
    var interest = $('[name="interest"]').find(':selected').text();
    var message = $('[name="message"]').val();

    var request = $.ajax({
      url: '/contact',
      method: 'POST',
      data: {
        name: name,
        inputEmail: inputEmail,
        interest: interest,
        message: message
      }
    });

    request.done(function(){
      alert('Success!');
    });
  });

});
