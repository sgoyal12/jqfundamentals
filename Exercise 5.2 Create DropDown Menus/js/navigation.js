class DropDownMenu {
  constructor(options) {
    this.mainMenu = $(options.mainMenuSelector);
    this.menuItems = this.mainMenu.children(options.menuItemSelector);
  }

  init() {
    this.menuItems.hover(this.hoverEventHandler.bind(this));
  }

  hoverEventHandler(event) {
    let target = $(event.target);
    let subMenu = target.children("ul");
    if(event.type === "mouseenter") {
      this.hoverInEventHandler(target, subMenu);
    }
    else {
      this.hoverOutEventHandler(target, subMenu);
    }
  }

  hoverInEventHandler(target, subMenu) {
    target.addClass("hover");
    if(subMenu.length) {
      subMenu.show();
    }
  }

  hoverOutEventHandler(target, subMenu) {
    target.removeClass("hover");
    if(subMenu.length) {
      subMenu.hide();
    }
  }
}
$(document).ready(() => {
  let options = {
    mainMenuSelector: "[data-nav-main-menu='main_menu']",
    menuItemSelector: "[data-nav-menu-item='item']"
  };
  let dropDownMenu = new DropDownMenu(options);
  dropDownMenu.init();
});