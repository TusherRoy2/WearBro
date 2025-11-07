// ===============================
// 🦉 Owl Carousel (Homepage)
// ===============================
$(document).ready(function () {
  if ($(".owl-carousel").length) {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 2 },
        600: { items: 2 },
        1000: { items: 3 },
      },
    });
  }
});