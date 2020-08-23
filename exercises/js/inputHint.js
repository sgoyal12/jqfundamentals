class Hint {
  constructor(options) {
    this.parentForm = $(options.formSelector);
    this.inputField = this.parentForm.find(options.inputSelector);
    this.labelField = this.parentForm.find(options.labelSelector);
  }

  init() {
    this.removeLabelFeild();
    this.bindEventHandlers();
  }

  removeLabelFeild() {
    // Set the value of the search input to the text of the label element
    let labelText = this.labelField.text();
    this.inputField.data("labelText", labelText);
    this.inputField.val(labelText);
    // Add a class of "hint" to the search input
    this.inputField.addClass("hint");
    // Remove the label element
    this.labelField.remove();
  }

  bindEventHandlers() {
    // Bind a focus event to the search input that removes the hint text and the "hint" class
    this.inputField.focus(this.focusEventHandler);
    // Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
    this.inputField.blur(this.blurEventHandler);

  }

  focusEventHandler() {
    let element = $(this);
    element.val("");
    element.removeClass("hint");
  }

  blurEventHandler() {
    let element = $(this);
    element.val(element.data("labelText"));
    element.addClass("hint");
  }
}
$(function() {
  let options = { inputSelector: "[data-input-hint='input-field']",
                  labelSelector: "[data-input-hint-label='input-label-field']",
                  formSelector: "[data-input-hint-form='hint-form']" };
  let hint = new Hint(options);
  hint.init();
});