// Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
// Bind a click event to the headline that will use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div. Don't forget to prevent the default action of the click event.
class ContentLoader {
	constructor(options) {
    this.options = options;
		this.listOfItems = $(options.listSelector);
	}

  init() {
    this.addDivForContent();
    this.listOfItems.bind("click", this.listItemClickEventHandler.bind(this));
  }

  addDivForContent() {
    let parent = this.listOfItems.parent();
    this.listOfItems.detach();
    this.listOfItems.children("li").each(this.createDivForListItem.bind(this));
    parent.append(this.listOfItems);
  }

  createDivForListItem(index, item) {
    let $item = $(item),
        div = $("<div></div>"),
        id = $item.find("a").attr("href");
    div.insertAfter($item.children(this.options.addDivAfterSelector));
    $item.data({ 
      "contentDiv": div,
      "contentId": id
    });
  }

  listItemClickEventHandler(event) {
    let target = $(event.target.closest("li"));
    if(target) {
      event.preventDefault();
      this.loadContentInsideDiv(target);
    }
  }

  loadContentInsideDiv(target) {
    let post = target.data("contentId");
    target.data("contentDiv").load("data/" + post);
  }
}
$(document).ready(() => {
  const options = { 
    listSelector: "[data-load-blog-list='list']",
    addDivAfterSelector: "[data-content-div-after='true']"
  };
  let contentLoader = new ContentLoader(options);
  contentLoader.init();
});
