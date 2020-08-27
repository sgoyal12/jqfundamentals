class Navigation {
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
    let target = $(event.target).addClass(this.options.hoverClass);
    target.find(this.options.subMenuItemSelector).show();
  }

  hoverOutEventHandler() {
    let target = $(event.target).removeClass(this.options.hoverClass);
    target.find(this.options.subMenuItemSelector).hide();
  }
}
$(() => {
  let options = {
    mainMenuSelector: "[data-nav-main-menu='main_menu']",
    menuItemSelector: "[data-nav-menu-item='item']",
    subMenuItemSelector: "[data-nav-sub-menu-item='item']",
    hoverClass: "hover"
  };
  let navigation = new Navigation(options);
  navigation.init();
});