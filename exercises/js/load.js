// Create a target div after the headline for each blog post and store a reference to it on the headline element using $.fn.data.
// Bind a click event to the headline that will use the $.fn.load method to load the appropriate content from /exercises/data/blog.html into the target div. Don't forget to prevent the default action of the click event.
class ContentLoader {
	constructor(options) {
		this.listOfItems = $(options.listSelector);
    this.dataPath = options.dataPath;
	}

  init() {
    this.addDivForContent();
    this.bindEvents();
  }

  bindEvents() {
    this.listOfItems.on("click", "li", this, (event) =>{
      let target = $(event.target.closest("li"));
      if(target) {
        event.preventDefault();
        event.data.loadContentInsideDiv(target);
      }
    });
  }

  addDivForContent() {
    let parent = this.listOfItems.parent();
    this.listOfItems.detach();
    this.createDivsForListItems();
    parent.append(this.listOfItems);
  }

  createDivsForListItems() {
    this.listOfItems.children("li").each((index, item) => {
      let $item = $(item),
          $div = $(`<div data-blog-id="${index}"></div>`),
          id = $item.find("a").attr("href"),
          $headLine = $item.children("h3");
      $div.insertAfter($headLine);
      $headLine.data({ 
        "divReferenceId": `[data-blog-id="${index}"]`,
        "contentId": id
      });
    });
  }

  loadContentInsideDiv(target) {
    let $headLine = target.find("h3"),
        post = $headLine.data("contentId"),
        contentDivId = $headLine.data("divReferenceId"),
        $contentDiv = target.find(contentDivId); 
    $contentDiv.load(this.dataPath + post.replace("#", " #"));
  }
}
$(document).ready(() => {
  const options = { 
    listSelector: "[data-load-blog-list='list']",
    dataPath: "data/"
  };
  let contentLoader = new ContentLoader(options);
  contentLoader.init();
});
