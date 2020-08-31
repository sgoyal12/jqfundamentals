//Exercise Manipulating Solution

//Add five new list items to the end of the unordered list #myList.
const list = $("#myList"),
      newItems = (Array(5).fill('')).map((value, index) => `<li>New Item ${index+1}</li>`);    
list.append(newItems.join(""));

//Remove the odd list items
$("#myList li:even").remove();

// Add another h2 and another paragraph to the last div.module
const lastDivModule = $("div.module").last(),
      newElementsForDivModule = `<h2>Adding a new Heading</h2>
                                 <p>New paragraph is being added</p>`;
lastDivModule.append(newElementsForDivModule);

// Add another option to the select element; give the option the value "Wednesday"
$("#specials select").append("<option>Wednesday</option>");

// Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
let newImageElement = $("img").first().clone();
let newModuleElement = $("<div></div>", {
  "class": "module"
});
newModuleElement.append(newImageElement);
newModuleElement.insertAfter(lastDivModule);