// Append a target div after the form that's inside the #specials element; this will be where you put information about the special once you receive it.
// Bind to the change event of the select element; when the user changes the selection, send an Ajax request to /exercises/data/specials.json.

// When the request returns a response, use the value the user selected in the select (hint: $.fn.val) to look up information about the special in the JSON response.
// Add some HTML about the special to the target div you created.
// Finally, because the form is now Ajax-enabled, remove the submit button from the form.
// Note: that we're loading the JSON every time the user changes their selection. How could we change the code so we only make the request once, and then use a cached response when the user changes their choice in the select?
class LoadJson {
  constructor(containerSelector) {
    this.container = $(containerSelector);
    this.form = this.container.find("form");
    this.content = $("<div></div>");
    this.select = this.form.find("select");
  }

  init() {
    this.content.insertAfter(this.form);
    this.select.data("content", this.content);
    this.bindChangeEvent();
    this.removeSubmitButton();
  }

  removeSubmitButton() {
    this.form.find("input[type='submit']").remove();
  }

  bindChangeEvent() {
    this.select.bind("change", (event) => {
      let val = this.select.val();
      if(this.select.data('valueData')) {
        this.setContentDiv(val);
      }
      else {    
        $.getJSON("data/specials.json", (data) => {
          this.select.data("valueData", data);
          this.setContentDiv(val);
        });
      }
    });
  }

  setContentDiv(value) {
    let data = this.select.data("valueData"),
        valueData = data[value],
        html = "<h3>" + valueData.title + "</h3>";
    html += "<p>" + valueData.text + "</p>";
    html += "<img src='/exercises" + valueData.image + "' alt='" + valueData.title +"'/>"
    this.select.data('content').html(html);
  }
}
let loadJson = new LoadJson('[data-load-json-container="container"]');
loadJson.init();