document.addEventListener("DOMContentLoaded", function () {
  let img_tag = document.getElementById('source-gif');
  var rub = new SuperGif(
    { gif: img_tag, auto_play: false, draw_while_loading: false, show_progress_bar: false }
  );
  let sections = ["section1", "section2", "section3", "section4"];
  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout;

  rub.load(function () {
    console.log('oh hey, now the gif is loaded');
    rub.play(); // Play the gif initially

    setTimeout(function () {
      rub.pause(); // Pause the gif
    }, 5000);

    setTimeout(function () {
      document
        .getElementById('overlay')
        .style
        .display = 'block';
      setTimeout(function () {
        document
          .getElementById('logo')
          .style
          .display = 'block';
        setTimeout(function () {
          for (let i = 0; i < sections.length; i++) {
            document
              .getElementById(sections[i])
              .style
              .display = 'flex';
          }
        }, 100);
      }, 1000);
    }, 1000);
  });

  let debounceFunction = function (func, delay) {
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => func.apply(context, args), delay);
    }
  }

  window.addEventListener('wheel', debounceFunction(function (e) {
    if (isScrolling)
      return;
    isScrolling = true;

    // Hide current section
    document
      .getElementById(sections[currentIndex])
      .classList
      .remove('visible');

    // Check scroll direction
    if (e.deltaY > 0) {
      // Scroll down: Move to next section
      currentIndex = (currentIndex + 1) % sections.length;
    } else {
      // Scroll up: Move to previous section
      currentIndex = (currentIndex - 1 + sections.length) % sections.length;
    }

    // Show new section
    document
      .getElementById(sections[currentIndex])
      .classList
      .add('visible');

    // Play the gif during the scrolling
    rub.play();

    // Pause the gif after scrolling
    setTimeout(function () {
      rub.pause();
      isScrolling = false;
    }, 1500);
  }, 250));

  document.querySelector('nav').addEventListener('click', function (event) {
    event.preventDefault();

    // Check if a link was clicked
    if (event.target.tagName === 'A') {
      // Hide current section
      document.getElementById(sections[currentIndex]).classList.remove('visible');

      // Get new index
      let sectionId = event.target.getAttribute('href').substring(1); // Remove #
      currentIndex = sections.indexOf(sectionId);

      // Show new section
      document.getElementById(sections[currentIndex]).classList.add('visible');

      // Adjust animation
      let animationDiv = document.querySelector('nav .animation');
      animationDiv.className = 'animation start-' + sectionId;
    }
  });

  window.onload = function () {
    console.log('showing nav, onload');
    var nav = document.querySelector('nav');
    nav.classList.add('visible');
  };
});
