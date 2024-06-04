const booksContainer = document.querySelector(".books");
const listGenre = document.querySelector(".list-genre");

function renderError() {
  const messageError = document.createElement("div");
  messageError.classList.add("error");
  messageError.innerHTML = "<i>Algo Salio Mal</i>";
  booksContainer.append(messageError);
}

const getInfoBook = async () => {
  try {
    const res = await fetch("./books.json");
    const books = await res.json();
    return Array.from(books);
  } catch (e) {
    renderError();
    throw new Error(`Internal Sever Error: ${e}`);
  }
};
/*TODO: conseguir todas las categorías de los libros y filtrarlas en una lista para que no queden repetidas*/
const createCategories = async () => {
  try {
    const books = await getInfoBook();
    const categoryBooks = books.map((book) => book.category);
    const newCategories = Array.from(new Set(categoryBooks));
    return newCategories;
  } catch (e) {
    renderError();
    throw new Error("Internal server error");
  }
};

const renderTags = async () => {
  const categories = await createCategories();
  categories.sort();
  listGenre.innerHTML = "";
  categories.forEach((category) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item", "item");
    listItem.innerHTML = `
        <a href="#${category
          .split(" ")
          .join("-")
          .toLowerCase()}">${category}</a>
        `;
    listGenre.append(listItem);
  });
};

/*Renderizar las secciones para los libros*/
const renderSections = async () => {
  const categories = await createCategories();
  categories.sort();
  if (!categories) renderError();
  else {
    booksContainer.innerHTML = "";

    categories.forEach((category) => {
      const SectionCategory = document.createElement("section");
      SectionCategory.classList.add("book-category");
      SectionCategory.setAttribute(
        "data-category",
        category.split(" ").join("-")
      );
      SectionCategory.setAttribute(
        "id",
        category.split(" ").join("-").toLowerCase()
      );
      SectionCategory.innerHTML = /*html*/ `
            <strong class="category-title">${category}</strong>
            <div class="section-books"></div>
           `;
      booksContainer.append(SectionCategory);
    });
  }
};

const createBookElement = ({ link, imageLink, title, author, pages }) => {
  const BookElement = document.createElement("div");
  BookElement.classList.add("book");
  const BookHtml = /*html*/ `
        <div class="wrapper">
            <a href="${link}" rel="noopener noreferrer" target="_blank">
                <img src="${imageLink}">
            </a>
        </div>
        <div class="info-book">
            <strong class="bookTitle">${title}</strong>
            <strong class="bookAuthor">Author: ${author}</strong>
            <small class="bookPages">Pages: ${pages}</small>
        </div>
        `;
  BookElement.innerHTML = BookHtml;
  return BookElement;
};

const renderBooks = async () => {
  const booksData = await getInfoBook();
  const SectionsCategories = document.querySelectorAll(".book-category");
  const categoryMap = new Map();
  if (!booksData) {
    renderError();
  } else {
    SectionsCategories.forEach((section) => {
      categoryMap.set(
        section.dataset.category,
        section.querySelector(".section-books")
      );
    });
    /*Crear cada libro*/
    booksData.forEach((book) => {
      const { category } = book;
      const BookElement = createBookElement(book);
      /*Renderizar cada libro el el container de la section*/
      const container = categoryMap.get(category.split(" ").join("-"));
      if (container) container.append(BookElement);
    });
  }
};

const init = () => {
  renderTags();
  renderSections();
  renderBooks();
};

export default init;
