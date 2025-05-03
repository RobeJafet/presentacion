/* --- Function Index --- */
var site = {
  // 1st function to fire
  ready: ready,
  // 2nd function to fire
  load: load,
  scroll: scroll,
  resize: resize,
  responsive: function getResponsive() {
    var windowWidth = window.innerWidth;
    var size;
    if (windowWidth > 993) {
      size = "lg"
    }
    else if (windowWidth <= 993 && windowWidth > 375) {
      size = "md"
    }
    else if (windowWidth <= 375) {
      size = "sm"
    }

    return size
  }
}

function ready() {
  // REMOVE THIS WHEN CHANGED TO RUBY 


  scroll();
}

$(document).ready(function () {
  site.ready();
});

function load() {
  $('.loader-component').delay(600).fadeOut('slow');
  $('main').css({
    opacity: 1
  });
}

$(window).on('load', function () {
  site.load();
});

function resize() {
  var r = site.responsive()
}

$(window).on('resize', function () {
  site.resize();
});

// VALIDATE FORMS
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

const Util = {
  getSelectorFromElement(element) {
    var selector = element.getAttribute('data-target')
    if (!selector || selector === '#') {
      selector = element.getAttribute('href') || ''
    }

    try {
      return document.querySelector(selector) ? selector : null
    } catch (err) {
      return null
    }
  },
  getIdFromDropdown(element) {
    var selector = element.parentElement.getAttribute("data-id")

    try {
      return document.getElementById(selector) ? document.getElementById(selector) : null
    } catch (err) {
      return null
    }
  }
}

// Toggle Classes for [data-toggle=] HTML tags.
/* PARAMS: 
  class to toggle: data-toggle="class"
  Target to toggle above class: data-target="header, main"
*/
$(function () {
  $(document).on('click', '[data-toggle="show"]', function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A' && $(this).data("prevent") != false) {
      event.preventDefault()
    }

    const $trigger = $(this)
    const selector = Util.getSelectorFromElement(this)
    const selectors = [].slice.call(document.querySelectorAll(selector))
    $(selectors).each(function () {
      const $target = $(this)
      const $data = $trigger.data("toggle")
      $target.toggleClass($data)
      const $focus = $trigger.data("focus")
      if ($focus != "") {
        console.log("focus", $focus)
        $($focus).focus()
      }
    })
  })

  $(document).on('click', '[data-link="offset"]', function (event) {
    const $offset = $(this).data("link-offset");
    const $trigger = $(this).attr("href");
    $('html, body').stop().animate({ scrollTop: $($trigger).offset().top - $offset });
  })
})


$(document).on("click", ".input-number-increment", function (e) {
  var quantity = $(this).parent().find("input").val();
  $(this).parent().find("input").val(parseInt(quantity) + 1).change();
});

$(document).on("click", ".input-number-decrement", function (e) {
  var quantity = $(this).parent().find("input").val();
  if (quantity <= 1)
      $(this).parent().find("input").val(1).change();
  else
      $(this).parent().find("input").val(parseInt(quantity) - 1).change();
});

let circleCount = 0;
const speed = 3;
const rotate = Math.floor(Math.random() * 360); // Ángulo inicial aleatorio

function animateCircle($circle, x, y, dirX, dirY, rotate) {
  const dvdWidth = $circle.outerWidth();
  const dvdHeight = $circle.outerHeight();

  function animate() {
    const screenHeight = $(window).height();
    const screenWidth = $(window).width();

    // Rebote vertical
    if (y + dvdHeight >= screenHeight) {
      y = screenHeight - dvdHeight - 1;
      dirY *= -1;
      rotate -= 90;
    } else if (y <= 0) {
      y = 1;
      dirY *= -1;
      rotate -= 90;
    }

    // Rebote horizontal
    if (x + dvdWidth >= screenWidth) {
      x = screenWidth - dvdWidth - 1;
      dirX *= -1;
      rotate -= 90;
    } else if (x <= 0) {
      x = 1;
      dirX *= -1;
      rotate -= 90;
    }

    x += dirX * speed;
    y += dirY * speed;

    $circle.css({
      left: x + 'px',
      top: y + 'px',
      transform: `rotate(${rotate}deg)`
    });

    window.requestAnimationFrame(animate);
  }

  animate();
}


$(document).on('click', '.noise', function () {
  circleCount++;
  const $new = $('.circle-template').clone();

  $new.removeClass('circle-template').addClass('circle');
  const $container = $('.container-circles');
  const containerWidth = $container.width();
  const containerHeight = $container.height();
  const startX = Math.floor(Math.random() * (containerWidth - $new.outerWidth()));
  const startY = Math.floor(Math.random() * (containerHeight - $new.outerHeight()));

  $('.container-circles ').append($new);
  $new.css({
    position: 'absolute',
    left: startX + 'px',
    top: startY + 'px'
  });

  const dirX = Math.random() > 0.5 ? 1 : -1;
  const dirY = Math.random() > 0.5 ? 1 : -1;

  animateCircle($new, startX, startY, dirX, dirY, rotate);
});


$(function() {
  const swiperBlur = new Swiper('.swiper-blur', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    loop: true,
    disableOnInteraction: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
})