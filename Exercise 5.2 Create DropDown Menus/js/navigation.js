class DropDownMenu {
  constructor(options) {
    this.options = options
    this.mainMenu = $(options.mainMenuSelector);
    this.menuItems = this.mainMenu.find(options.menuItemSelector);
  }

  init() {
    this.menuItems.hover(this.hoverInEventHandler.bind(this),
                         this.hoverOutEventHandler.bind(this));
  }

  hoverInEventHandler() {
    let target = $(event.target);
    let subMenu = target.find(this.options.subMenuItemSelector);
    target.addClass(this.options.hoverClass);
    subMenu.show();
  }

  hoverOutEventHandler() {
    let target = $(event.target);
    let subMenu = target.find(this.options.subMenuItemSelector);
    target.removeClass(this.options.hoverClass);
    subMenu.hide();
  }
}
$(document).ready(() => {
  let options = {
    mainMenuSelector: "[data-nav-main-menu='main_menu']",
    menuItemSelector: "[data-nav-menu-item='item']",
    subMenuItemSelector: "[data-nav-sub-menu-item='item']",
    hoverClass: "hover"
  };
  let dropDownMenu = new DropDownMenu(options);
  dropDownMenu.init();
});