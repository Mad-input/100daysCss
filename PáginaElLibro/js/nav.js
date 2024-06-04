/*
Funcionalidad navigation
*/

const listItems = document.querySelectorAll(".nav-list .list-item");
const submenus = document.querySelectorAll(".submenu");

const nav = () => {
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      submenus.forEach((submenu) => {
        if (
          submenu.classList.contains("hidden") &&
          item.dataset.list === submenu.dataset.list
        ) {
          submenu.classList.toggle("hidden");
          submenu.style.heigth += `${submenu.scrollHeight}px`;
        } else {
          submenu.classList.add("hidden");
        }
      });
    });

    item.addEventListener("blur", () => {
      item.querySelector(".submenu").classList.add("hidden");
    });
  });
};

export default nav;
