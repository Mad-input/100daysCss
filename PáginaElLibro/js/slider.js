/*Funcionalidad para el slider del header*/

/*Content Slider*/

const slider = () => {
  const btnRight = document.querySelector(".btnMoveRight");
  const btnLeft = document.querySelector(".btnMoveLeft");
  const BannersContainer = document.querySelector(".banners");
  let pass = 0;
  const moveScroll = (direction, slider) => {
    /*Tomar un elemento de los banners*/
    const elemenstSlider = slider.querySelectorAll(".item");
    const currentElement = elemenstSlider[0];
    const elementWidth = currentElement.offsetWidth;

    if (direction === "left") {
      /*Sumar al scroll el ancho del elemento del banner*/
      slider.scrollLeft -= elementWidth;
      pass = Math.max(pass - 1, 0);
    } else if (direction === "right") {
      if (pass >= elemenstSlider.length - 2) {
        slider.scrollLeft = 0;
        pass = 0;
      } else {
        slider.scrollLeft += elementWidth;
        pass++;
      }
    }
  };
  if (BannersContainer) {
    BannersContainer.scrollLeft = 0;
    setInterval(() => {
      moveScroll("right", BannersContainer);
    }, 3000);
  }

  btnRight.addEventListener("click", () =>
    moveScroll("right", BannersContainer)
  );
  btnLeft.addEventListener("click", () => moveScroll("left", BannersContainer));
};

export default slider;
