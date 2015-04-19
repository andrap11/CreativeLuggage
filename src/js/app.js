$(document ).ready(function() {
   $('.hero-banner a').hover (function(){
      $('.hero-banner a').removeClass('active');
      $(this).addClass('active');
   });
   $('.image-slider').slick({
    autoplay: true,
    dots: true,
    arrows: false
   });
});