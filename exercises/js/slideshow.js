// This is a tough one if you do not know JS basics and particularly scopes.

// Open the file /exercises/index.html in your browser. Use the file /exercises/js/slideshow.js. Your task is to take a plain semantic HTML page and enhance it with JavaScript by adding a slideshow.

// Move the #slideshow element to the top of the body.

// Write code to cycle through the list items inside the element; fade one in, display it for a few seconds, then fade it out and fade in the next one.

// When you get to the end of the list, start again at the beginning.

// For an extra challenge, create a navigation area under the slideshow that shows how many images there are and which image you're currently viewing. (Hint: $.fn.prevAll will come in handy for this.)
class SlideShow {
  constructor(contentSelector) {
    this.slideshowContent = $(contentSelector);
    this.listOfItems = this.slideshowContent.children();
    //this.listOfDots = slideshowNavigation.children();
  }

  init() {
    $("body").prepend(this.slideshowContent);
    this.setupNavigation();
    this.listOfItems.hide();
    this.startSlideShow();
  }

  setupNavigation() {
    let length = this.listOfItems.length;
    let divNav = $("<div></div>");
    divNav.css("text-align", "center");
    for(let i = 0; i < length; i++) {
      divNav.append("<span class='dot'></span>");
    }
    divNav.insertAfter(this.slideshowContent);
    this.listOfDots = divNav.children();
  }

  startSlideShow() {
    let length = this.listOfItems.length,
        startIndex = 1;
    setInterval(() => {
      this.fadingElement(startIndex);
      if(startIndex + 1 < length) {
        startIndex++;
      }
      else {
        startIndex = 0;
      }
    }, 4000);
    this.fadingElement(0);
  }

  fadingAnimation(element) {
    element.fadeIn(1000);
    element.delay(2000).fadeOut(1000);
  }

  fadingElement(index) {
    let element = this.listOfItems.eq(index),
        navigationDot = this.listOfDots.eq(index);
    this.fadingAnimation(element);
    navigationDot.addClass("active");
    navigationDot.siblings().removeClass("active");    
  }
}
let slideshow = new SlideShow("[data-slideshow-content='content']");
slideshow.init();