class RevealText {
  constructor(options) {
    this.blogList = options.list;
  }

  init() {
    this.bindClickToList();
  }

  bindClickToList() {
    this.blogList.bind("click", function(event) {
      event.preventDefault();
      let h3Element = $(this);
      h3Element.parents("ul").find("p:visible").slideToggle();
      h3Element.next().slideToggle();
    });
  }
}
$(document).ready(() => {
  let options = { list: $("[data-id='blog'] h3") },
      revealText = new RevealText(options);
  revealText.init();
});
