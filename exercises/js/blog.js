class RevealText {
  constructor(options) {
    this.blogList = $(options.listSelector);
  }

  init() {
    this.bindClickTolist();
  }

  bindClickTolist() {
    this.blogList.delegate("h3", "click", function(event) {
      event.preventDefault();
      let h3Element = $(event.target.closest("h3")),
          excerpt = h3Element.next(),
          visibleExcerpt = h3Element.parents("ul").find("p:visible");
      visibleExcerpt.slideUp();    
      excerpt.slideDown();
    });
  }
}
$(document).ready(() => {
  const options = { listSelector: "[data-id='blog'] ul" },
      revealText = new RevealText(options);
  revealText.init();
});
