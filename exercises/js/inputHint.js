class SearchHandler {
  constructor(options) {
    this.parentForm = $(options.formSelector);
    this.className = options.className;
    this.inputField = this.parentForm.find(options.inputSelector);
    this.labelField = this.parentForm.find(options.labelSelector);
  }

  init() {
    this.removeLabelField();
    this.bindEventHandlers();
  }

  removeLabelField() {
    // Set the value of the search input to the text of the label element
    // Add a class of "hint" to the search input
    this.setLabelText();
    // Remove the label element
    this.labelField.remove();
  }

  setLabelText() {
    const labelText = this.labelField.text();
    this.inputField.val(labelText);
    this.inputField.addClass(this.className);
  }

  removeLabelText() {
    this.inputField.val("");
    this.inputField.removeClass(this.className);
  }

  bindEventHandlers() {
    // Bind a focus event to the search input that removes the hint text and the "hint" class
    this.inputField.focus(this.removeLabelText.bind(this));
    // Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
    this.inputField.blur(this.setLabelText.bind(this));

  }
}
$(function() {
  let options = { 
    inputSelector: "[data-input-hint='input-field']",
    labelSelector: "[data-input-hint-label='input-label-field']",
    formSelector: "[data-input-hint-form='hint-form']",
    className: "hint"
  };
  let searchHandler = new SearchHandler(options);
  searchHandler.init();
});