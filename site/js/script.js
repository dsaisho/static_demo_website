"use strict";

window.onload = function () {
  init();
};

var emailActive = false;
var els = {
  emailInput: "email-input",
  emailLabel: "email-label",
  emailSubmit: "submit",
  validity: "validity",
  goUp: "go-up",
  viewAll: "view-all",
  exploreList: "explore-list"
};
var set = 1;

function init() {
  cacheEls();
  els.goUp.addEventListener('click', goUpClicked);
  els.emailInput.addEventListener("click", emailInputClicked);
  els.emailSubmit.addEventListener("click", emailSubmitClicked);
  els.emailInput.addEventListener('blur', emailBlurHandler);
  els.emailInput.addEventListener("keypress", emailKeyPressed);
  els.viewAll.addEventListener("click", viewAllClicked);
  loadDestinationData(window.apiData);
  animateHero();
}

function cacheEls() {
  Object.keys(els).map(function (val, i) {
    var el = els[val];
    els[val] = document.getElementById(el);
  });
}

function animateHero() {
  TweenLite.to('.container', .5, {
    autoAlpha: 1
  });
  TweenLite.from('.title', 1, {
    opacity: 0,
    x: -50,
    delay: .8
  });
  TweenLite.from('.desc', 1, {
    opacity: 0,
    x: 50,
    delay: .8
  });
  TweenLite.from('.discover', .5, {
    opacity: 0,
    delay: 1.8
  });
  var heroLinks = document.querySelectorAll('.hero-link');
  var delayValue = 2.3;

  for (var i = 0; i < heroLinks.length; i++) {
    TweenLite.to(heroLinks[i], .2, {
      y: -20,
      delay: delayValue
    });
    TweenLite.to(heroLinks[i], .2, {
      y: 0,
      delay: delayValue + .2
    });
    delayValue += .1;
  }
}

function viewAllClicked() {
  loadDestinationData(window.apiData);
  TweenLite.to(els.viewAll, 1, {
    autoAlpha: 0
  });
}

function loadDestinationData(json) {
  var destinations = json.destinations;
  var markupFooter = "<div class='cta read-more'>Read More</div></div></div>";
  var delayValue = 0;
  Object.keys(destinations).map(function (value, index) {
    var destination = destinations[value];
    var cardClass = value + set;
    var heartId = value + '_heart_' + set;
    var markupHeader = "<div class='card-container ".concat(cardClass, "'>");
    var card = "<div class='card rounded' style=\"background-image:url('".concat(destination.img, "')\">");
    var heart = "<div id='".concat(heartId, "' class='heart ").concat(destination.favorite, "'></div>");
    var price = "<div class='price'>".concat(destination.price, "</div>");
    var title = "<h3>".concat(destination.title, "</h3>");
    var desc = "<p>".concat(destination.desc, "</p>");
    var destinationCard = markupHeader + card + heart + price + title + desc + markupFooter;
    els.exploreList.insertAdjacentHTML('beforeend', destinationCard);
    TweenLite.set(".".concat(cardClass), {
      opacity: "0"
    });
    TweenLite.to(".".concat(cardClass), 1, {
      opacity: 1,
      delay: delayValue
    });
    delayValue += .1;
    document.getElementById(heartId).addEventListener('click', heartClicked);
  });
  set++;
}

function heartClicked(e) {
  if (e.target.className.includes('active')) {
    e.target.className = 'heart';
  } else {
    e.target.className = 'heart active';
  }
}

function goUpClicked() {
  TweenLite.to(window, 1, {
    scrollTo: {
      y: 0
    }
  });
}

function emailSubmitClicked() {
  if (validateEmail(els.emailInput.value)) {
    TweenLite.to('.input-container', .5, {
      autoAlpha: 0
    });
    TweenLite.set('.input-container', {
      display: "none",
      delay: .5
    });
    TweenLite.to('.email-success', .5, {
      autoAlpha: 1,
      delay: .5
    });
  } else {
    alert("Please enter a valid email address");
  }
}

function emailInputClicked() {
  emailActive = true;
  els.emailLabel.className = 'active';
}

function emailBlurHandler() {
  var emailValue = els.emailInput.value;

  if (!emailValue) {
    els.emailLabel.className = els.validity.className = els.validity.innerHTML = '';
  }
}

function emailKeyPressed() {
  var emailValue = els.emailInput.value;

  if (validateEmail(emailValue)) {
    els.validity.innerHTML = ' - valid';
    els.validity.className = 'green';
  } else {
    els.validity.innerHTML = ' - not valid';
    els.validity.className = 'red';
  }
}

function validateEmail(address) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address)) {
    return true;
  }

  return false;
}
/******************* POLYFILL *************************/


if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';

    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    }

    if (start === undefined) {
      start = 0;
    }

    return this.indexOf(search, start) !== -1;
  };
}