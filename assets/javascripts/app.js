
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
    var interest = $('[name="interest"]').find(':selected').val();
    var message = $('[name="message"]').val();

    if (!validateEmail(inputEmail)) {
      alert("Please enter valid email");
    } else {
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
    }
  });

});

/* Shallow email validation that checks for presence and that only one @
** Test Cases:
** validateEmail("sadfds@yahoo.com") => true
** validateEmail("sdfdssadf") => false
** validateEmail("safsd@sdfasd@.com") => false
** validateEmail("") => false
*/
function validateEmail(email) {
  var re = /^[^@]+@[^@]+$/;

  return (re.test(email)) ? true : false;
}
