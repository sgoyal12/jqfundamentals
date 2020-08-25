// This is a tough one if you do not know JS basics and particularly scopes.

// Open the file /exercises/index.html in your browser. Use the file /exercises/js/slideshow.js. Your task is to take a plain semantic HTML page and enhance it with JavaScript by adding a slideshow.

// Move the #slideshow element to the top of the body.

// Write code to cycle through the list items inside the element; fade one in, display it for a few seconds, then fade it out and fade in the next one.

// When you get to the end of the list, start again at the beginning.

// For an extra challenge, create a navigation area under the slideshow that shows how many images there are and which image you're currently viewing. (Hint: $.fn.prevAll will come in handy for this.)
const ANIMATION_SLIDESHOW_TIME = 3000;
class SlideShow {
  constructor(options) {
    this.slideshowContainer = $(options.containerSelector);
    this.slideshowContent = $(options.contentSelector);
    this.slideshowNext = $(options.nextSelector);
    this.slideshowPrev = $(options.prevSelector);
    this.listOfItems = this.slideshowContent.children();
    this.timeForAnimation = options.timeForAnimation;
    this.currentItem = 0;
  }

  init() {
    $("body").prepend(this.slideshowContainer);
    this.setupNavigation();
    if(this.listOfItems.length !== 1) {
      this.listOfItems.hide();
      this.addClickEventHandlers();
      this.showElement(this.currentItem);
    }
    else{
      this.listOfDots.eq(0).addClass("active");
      this.hideArrowNavigation();
    }
  }

  addClickEventHandlers() {
    this.slideshowNext.bind("click", this.nextClickEventHandler.bind(this));
    this.slideshowPrev.bind("click", this.prevClickEventHandler.bind(this));
  }

  hideArrowNavigation() {
    this.slideshowNext.hide();
    this.slideshowPrev.hide();
  }

  prevClickEventHandler() {
    this.listOfItems.eq(this.currentItem).stop(true, true).hide();
    this.currentItem = this.getPrevItemIndex(this.currentItem);
    this.showElement();
  }

  nextClickEventHandler() {
    this.listOfItems.eq(this.currentItem).stop(true, true).hide();
    this.currentItem = this.getNextItemIndex(this.currentItem);
    this.showElement();
  }

  setupNavigation() {
    let navigationContainer = $("<div></div>");
    navigationContainer.addClass("navigationContainer");
    this.listOfItems.map(() => {
      navigationContainer.append("<span class='dot'></span>");
    });
    navigationContainer.insertAfter(this.slideshowContent);
    navigationContainer.delegate("span", "click", this.navigationDotClicked.bind(this));
    this.listOfDots = navigationContainer.children();
  }

  getNextItemIndex(index) {
    if(index + 1 < this.listOfItems.length) {
      return index + 1;
    }
    else {
      return 0;
    }
  }

  getPrevItemIndex(index) {
    if(index - 1 >= 0) {
      return index - 1;
    }
    else {
      return this.listOfItems.length - 1;
    }
  }

  navigationDotClicked(event) {
    let $target = $(event.target),
        currentIndex = $target.index();
    this.listOfItems.eq(this.currentItem).stop(true, true).hide();
    this.currentItem = currentIndex;
    this.showElement();    
  }

  setNextSlide() {
    this.intervalPeriod = setTimeout(() => {
      this.currentItem = this.getNextItemIndex(this.currentItem);
      this.showElement();
    }, this.timeForAnimation);
  }

  stopSlideShow() {
    clearTimeout(this.intervalPeriod);
  }


  showSlide(element) {
    element.fadeIn(this.timeForAnimation/8);
    element.delay(this.timeForAnimation*3/4).fadeOut(this.timeForAnimation/8);
  }

  showElement() {
    this.stopSlideShow();
    let elementToShow = this.listOfItems.eq(this.currentItem),
        navigationDot = this.listOfDots.eq(this.currentItem);
    this.showSlide(elementToShow);
    navigationDot.addClass("active");
    navigationDot.siblings().removeClass("active");
    this.setNextSlide();
  }
}
let options = {
  containerSelector: "[data-slideshow-container='container']",
  contentSelector: "[data-slideshow-content='content']",
  nextSelector: "[data-slideshow-next='next']",
  prevSelector: "[data-slideshow-prev='prev']",
  timeForAnimation: ANIMATION_SLIDESHOW_TIME
};
let slideshow = new SlideShow(options);
slideshow.init();