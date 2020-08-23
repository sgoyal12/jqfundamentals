// Append a target div after the form that's inside the #specials element; this will be where you put information about the special once you receive it.
// Bind to the change event of the select element; when the user changes the selection, send an Ajax request to /exercises/data/specials.json.

// When the request returns a response, use the value the user selected in the select (hint: $.fn.val) to look up information about the special in the JSON response.
// Add some HTML about the special to the target div you created.
// Finally, because the form is now Ajax-enabled, remove the submit button from the form.
// Note: that we're loading the JSON every time the user changes their selection. How could we change the code so we only make the request once, and then use a cached response when the user changes their choice in the select?
const DEFAULT_OPTIONS = { containerSelector: '[data-load-json-container="container"]',
                          removeButton: "input[type='submit']" };
class LoadJson {
  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.$container = $(this.options.containerSelector);
    this.$form = this.$container.find("form");
    this.$select = this.$form.find("select");
  }

  init() {
    const $divContainer = $("<div></div>");
    $divContainer.insertAfter(this.$form);
    this.$select.data("content", $divContainer);
    this.bindChangeEvent();
    this.removeSubmitButton();
  }

  removeSubmitButton() {
    this.$form.find(this.options.removeButton).remove();
  }

  bindChangeEvent() {
    this.$select.bind("change", (event) => {
      const val = this.$select.val();
      this.setContentDivWithData(val);
    });
  }

  setContentDivWithData(value) {
    this.promiseToFetchDataService().then(resultData => {
      this.setContentDiv(value);
    }).catch(error => {
      console.log(error);
    });
  }

  promiseToFetchDataService() {
    return new Promise((resolve, reject) => {
      if(!this.data) {
        this.fetchSpecialsData(resolve, reject);
      }
      else {
        resolve(this.data);
      }
    });
  }

  fetchSpecialsData(resolve, reject) {
    $.getJSON("data/specials.json", data => {
      this.data = data;
      resolve(data);
    }).fail((jqxhr, textStatus, error) => {
      reject(new Error(`There was a ${error} Error`));
    });
  }
  
  setContentDiv(value) {
    const valueData = this.data[value];
    if(valueData) {
      const html = `<h3>${valueData.title}</h3>
      <p>${valueData.text}</p>
      <img src='/exercises${valueData.image}' alt='${valueData.title}'/>`;
      this.$select.data('content').html(html);
    }
    else {
      this.$select.data('content').html("");
    }
  }
}
(new LoadJson()).init();