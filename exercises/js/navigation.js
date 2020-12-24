// let ul = $("#nav");
// ul.hover(function (event) {
//   let target = $(event.target.closest("li"));
//   if(target.length && target.is("[data-class='main_menu']")) {
    
//   }
// });

class DropDownMenu {
  constructor(mainMenuSelector) {
    this.mainMenu = $(mainMenuSelector);
  }

  init() {
    this.mainMenu.children("li").hover(function(event) {
      let target = $(this);
      let subMenu = target.children("ul");
      if(event.type === "mouseenter") {
        target.addClass("hover");
        if(subMenu.length) {
          subMenu.show();
        }
      }
      else {
        target.removeClass("hover");
        if(subMenu.length) {
          subMenu.hide();
        }
      }
    });
  }
}
let dropDownMenu = new DropDownMenu("[data-nav-main-menu='main_menu']");
dropDownMenu.init();