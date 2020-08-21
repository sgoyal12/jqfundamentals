class RevealText {
  constructor(listSelector) {
    this.blogList = $(listSelector);
  }

  init() {
    this.bindClickTolist();
  }

  bindClickTolist() {
    this.blogList.bind("click", function(event) {
      event.preventDefault(); 
      let h3Element = $(event.target.closest("h3"));
      if(h3Element) {
        let excerpt = h3Element.next(),
            visibleExcerpt = h3Element.parents("ul").find("p:visible");
        visibleExcerpt.slideUp();    
        excerpt.slideDown();
      }
    });
  }
}
let revealText = new RevealText("[data-id='blog'] ul");
revealText.init();