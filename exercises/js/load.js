// Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
// Bind a click event to the headline that will use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div. Don't forget to prevent the default action of the click event.
class LoadHtml {
	constructor(options) {
		this.container = $(options.containerSelector);
    this.listOfItems = this.container.children("ul");
	}

  init() {
    this.addDivForContent();
    this.addClickHandler();
  }

  addDivForContent() {
    let parent = this.listOfItems.parent();
    this.listOfItems.detach();
    this.listOfItems.children("li").each(function() {
      let item = $(this),
          div = $("<div></div>"),
          id = item.find("a").attr("href").split("#")[1];
      div.insertAfter(item.children("[data-content-div-after='true']"));
      item.data({ "contentDiv": div,
                  "contentId": "#" + id });
    });
    parent.append(this.listOfItems);
  }

  addClickHandler() {
    this.listOfItems.bind("click", function(event) {
      let target = $(event.target.closest("li"));
      if(target) {
        event.preventDefault();
        let post = target.data("contentId");
        target.data("contentDiv").load("data/blog.html " + post);
      }
    });
  }
}
$(document).ready(() => {
  const options = { containerSelector: "[data-load-blog-container='container']" };
        loadHtml = new LoadHtml(options);
  loadHtml.init();
});
