//Exercise Traversing Solution

//Select all of the image elements on the page; log each image's alt attribute.
$("img").each(function() {
  console.log($(this).attr("alt"));
});

//Select the search input text box, then traverse up to the form and add a class to the form.
$("input.input_text").parent().addClass("abc");

//Select the list item inside #myList that has a class of "current" and remove that class from it; add a class of "current" to the next list item.
let listItem = $("#myList .current");
listItem.removeClass("current");
listItem.next().addClass("current");

//Select the select element inside #specials; traverse your way to the submit button.
$("#specials select").parents("form").find("input[type='submit']");

//Select the first list item in the #slideshow element; add the class "current" to it, and then add a class of "disabled" to its sibling elements.
let firstItem = $("#slideshow li").first();
firstItem.addClass("current");
firstItem.nextAll().addClass("disabled");