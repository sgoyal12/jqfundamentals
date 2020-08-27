// Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
// Bind a click event to the headline that will use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div. Don't forget to prevent the default action of the click event.
class ContentLoader {
	constructor(options) {
    this.options = options;
		this.listOfItems = $(options.listSelector);
	}

  init() {
    this.addDivForContent();
    this.listOfItems.on("click", "li", this, this.listItemClickEventHandler);
  }

  addDivForContent() {
    let parent = this.listOfItems.parent();
    this.listOfItems.detach();
    this.listOfItems.children("li").each(this.createDivForListItem.bind(this));
    parent.append(this.listOfItems);
  }

  createDivForListItem(index, item) {
    let $item = $(item),
        $div = $(`<div data-blog-id="${index}"></div>`),
        id = $item.find("a").attr("href"),
        $headLine = $item.children("h3");
    $div.insertAfter($headLine);
    $headLine.data({ 
      "divReferenceId": `[data-blog-id="${index}"]`,
      "contentId": id
    });
  }

  listItemClickEventHandler(event) {
    let target = $(this);
    if(target) {
      event.preventDefault();
      event.data.loadContentInsideDiv(target);
    }
  }

  loadContentInsideDiv(target) {
    let $headLine = target.find("h3"),
        post = $headLine.data("contentId"),
        contentDivId = $headLine.data("divReferenceId"),
        $contentDiv = target.find(contentDivId); 
    $contentDiv.load("data/" + post.replace("#", " #"));
  }
}
$(document).ready(() => {
  const options = { 
    listSelector: "[data-load-blog-list='list']"
  };
  let contentLoader = new ContentLoader(options);
  contentLoader.init();
});
