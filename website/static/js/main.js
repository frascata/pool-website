function showHomePage() {
  var mainNode = document.querySelector('.main');
  mainNode.style.visibility = 'visible';
  mainNode.style.opacity = '1';
  mainNode.style.transition = 'opacity 0.5s ease-in';
}

function hideAnimatedLogo() {
  var animatedLogoNode = document.querySelector('#animatedLogo');
  animatedLogoNode.style.display = 'none';
}

function fillAnimatedLogo() {
  var SVG_COLOR = '#1d1d1b';
  var animatedLogoNode = document.querySelector('#animatedLogo');
  var svgPaths = animatedLogoNode.querySelectorAll('svg path');
  for (var svgPath of svgPaths) {
    svgPath.setAttribute('fill', SVG_COLOR);
  }
}

function showAnimatedLogo() {
  var animatedLogoNode = document.querySelector('#animatedLogo');
  var mainNode = document.querySelector('.main');
  animatedLogoNode.style.display = 'block';
  anime({
    targets: '#animatedLogo .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function (el, i) {
      return i * 150;
    },
    direction: 'normal',
    loop: 1,
    complete: function () {
      fillAnimatedLogo();
      setTimeout(function () {
        mainNode.style.display = 'block';
        hideAnimatedLogo();
        showHomePage();
        showCookieLawMessage();
      }, 400);
    },
  });
  Cookies.set('animation', '1', {expires: 7});
}

function showContacts() {
  var contactsMenu = document.querySelector('.contacts-menu');
  if (contactsMenu.style.display == 'block') {
    contactsMenu.style.display = 'none';
  } else {
    contactsMenu.style.display = 'block';
  }
}