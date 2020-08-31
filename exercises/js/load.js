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
    this.listOfItems.on("click", "h3", (event) => {
      event.preventDefault();
      let $headLine = $(event.currentTarget),
          blogSelector = $headLine.data("blogSelector"),
          postId =  $headLine.data("postId").replace("#", " #");
      this.loadBlogContent(blogSelector, postId);
    });
  }

  addDivForContent() {
    let parent = this.listOfItems.parent();
    this.listOfItems.detach();
    this.createBlogContainerForListItems();
    parent.append(this.listOfItems);
  }

  createBlogContainerForListItems() {
    this.listOfItems.find("h3").each((index, item) => {
      let $headLine = $(item),
          $blogContainer = $(`<div>`),
          postId = $headLine.find("a").attr("href");
      $blogContainer.attr({
        "data-blog-id": index
      });
      $blogContainer.insertAfter($headLine);
      $headLine.data({ 
        "blogSelector": `[data-blog-id="${index}"]`,
        "postId": postId
      });
    });
  }

  loadBlogContent(blogSelector, postId) {
    let $blog = this.listOfItems.find(blogSelector); 
    $blog.load(this.dataPath + postId);
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
