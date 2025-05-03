/*
 * Anagrama 2024
 * https://www.anagrama.com/
 * Version (3.0.0)
 */


/*
 * <div class="fade-on-scroll">__<div>
 * ---
 * <div class="animate-on-scroll">__<div>
 * ---
 * <div class="stagger-on-scroll">
 *  <div class="stagger-child"></div>
 *  <div class="stagger-child"></div>
 * <div>
 * 
 * <div class="text-up">
 *  <p>some text</p>
 * <div>
 */

$(document).ready(function () {
  var $textUpElement = $('.text-up');

  if ($textUpElement.length > 0) {
    $textUpElement.each(function() {
      var $textElement = $(this);
      var textContent = $textElement.text().trim();
  
      var words = textContent.split(' ');
  
      var delay = 0.15;
  
      var $lineElement = $('<div class="overflow-wrapper"><div class="line"></div></div>');
      var $testElement = $('<div class="overflow-wrapper"><div class="line"></div></div>');
      var $lineContainer = $('<div class="line-container"></div>');
  
      $textElement.append($lineContainer);
  
      $lineContainer.append($lineElement);
      $lineContainer.append($testElement);
  
      var currentText = '';
      words.forEach(function(word) {
        currentText += word + ' ';
        var $line = $lineElement.find('.line');
        $testElement.find('.line').text(currentText);
        
        if ($testElement.width() < $textElement.width()) {
          $line.text(currentText);
        } else{
          currentText = word + ' ';
          $lineElement = $('<div class="overflow-wrapper"><div class="line"></div></div>');
          $lineContainer.append($lineElement);
          $lineElement.find('.line').css('transition-delay', delay + 's').text(currentText);
          delay += 0.1;
  
        }
      });
      $testElement.remove();  
    });
  }
});

$(window).on('load', function () {
  setTimeout(() => {
    setAnimationWaypoints();
  }, 650);
});

function setAnimationWaypoints() {

  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .fade-on-scroll, .custom-on-scroll, .text-up');
  const elementsToStagger = document.querySelectorAll('.stagger-on-scroll');

  let thresholdValue;
  let rootMarginValue;

  if (window.innerWidth > 993) {
    thresholdValue = 0.2
    rootMarginValue = '0px 0px -20% 0px'
  } else {
    thresholdValue = 0.1
    rootMarginValue = '0px 0px -10% 0px'
  }

  const observerOptions = {
    root: null,
    rootMargin: rootMarginValue,
    threshold: thresholdValue
  };

  if (elementsToAnimate.length > 0) {
    elementsToAnimate.forEach((element) => {
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const element = entry.target;
          if (isIntersecting) {
            element.classList.add('animate');
            setTimeout(() => {
              element.classList.remove('animate-on-scroll', 'fade-on-scroll', 'animate', 'custom-on-scroll', 'text-up');
              observer.unobserve(element);
            }, 1200);
          } else if (isAboveViewport(element)) {
            element.classList.remove('animate-on-scroll', 'fade-on-scroll', 'animate', 'custom-on-scroll', 'text-up');
            observer.unobserve(element);
          }
        });
      }, observerOptions);

      observer.observe(element);
    });
  }

  if (elementsToStagger.length > 0) {
    elementsToStagger.forEach((element) => {
      const staggerChildren = element.querySelectorAll('.stagger-child');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const element = entry.target;
          if (isIntersecting) {
            staggerChildren.forEach((child, index) => {
              child.style.animationDelay = `${0.25 * index}s`;
            });
            element.classList.add('animate');
            setTimeout(() => {
              element.classList.remove('stagger-on-scroll', 'animate');
              staggerChildren.forEach((child) => {
                child.style.animationDelay = '';
              });
              observer.unobserve(element);
            }, (1000 * staggerChildren.length));
          } else if (isAboveViewport(element)) {
            element.classList.remove('stagger-on-scroll', 'animate');
            staggerChildren.forEach((child) => {
              child.style.animationDelay = '';
            });
            observer.unobserve(element);
          }
        });
      }, observerOptions);

      observer.observe(element);
    });
  }
}

function isAboveViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < 0;
}
