class Hint {
  constructor(inputSelector, labelSelector) {
    this.inputFeild = $(inputSelector);
    this.labelFeild = $(labelSelector);
    this.labelText = this.labelFeild.text();
  }

  init() {
    this.removeLabelFeild();
    this.bindFocusEvent();
    this.bindBlurEvent();
  }

  removeLabelFeild() {
    // Set the value of the search input to the text of the label element
    this.inputFeild.val(this.labelText);
    // Add a class of "hint" to the search input
    this.inputFeild.addClass("hint");
    // Remove the label element
    this.labelFeild.remove();
  }

  bindFocusEvent() {
    // Bind a focus event to the search input that removes the hint text and the "hint" class
    this.inputFeild.bind("focus", function() {
      let element = $(this);
      element.val("");
      element.removeClass("hint");
    });
  }

  bindBlurEvent() {
    // Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
    this.inputFeild.bind("blur", { labelText: this.labelText }, function(event) {
        let element = $(this);
        element.val(event.data.labelText);
        element.addClass("hint");
      })
  }
}
let hint = new Hint("[data-input-hint='input_feild']", "[data-input-hint-label='input_label_feild']");
hint.init();