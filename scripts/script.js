const bookLibrary = [];
const libraryDOM = document.querySelector(".library");
const addBookBtnDOM = document.querySelector("button.add-book");
const dialogDOM = document.querySelector("dialog");

/**
 * 
 * @param {String} name string representation of the name of the Book
 * @param {String} author string representation of the name of the author
 * @param {Number} pages number of pages for the Book
 * @param {Boolean} read true/false whether the Book has been read
 */
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;

  // Ensure a unique ID for a newly created Book
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, read) {
  const book = new Book(name, author, pages, read);

  bookLibrary.push(book);
}

function displayBooks() {
  bookLibrary.forEach(book => {
    const bookDOM = document.createElement("div");
    const nameDOM = document.createElement("p");
    const authorDOM = document.createElement("p");
    const pagesDOM = document.createElement("p");
    const buttonContainerDOM = document.createElement("div");
    const buttonReadDOM = document.createElement("button");

    bookDOM.classList.add("book");
    nameDOM.classList.add("book-name");
    authorDOM.classList.add("book-author");
    pagesDOM.classList.add("book-pages");
    buttonContainerDOM.classList.add("button-container");
    buttonReadDOM.classList.add("book-read");

    nameDOM.textContent = book.name;
    authorDOM.textContent = book.author;
    pagesDOM.textContent = book.pages;
    buttonReadDOM.textContent = book.read === true ? "READ" : "NOT READ";

    bookDOM.append(nameDOM, authorDOM, pagesDOM, buttonContainerDOM);
    buttonContainerDOM.append(buttonReadDOM);

    libraryDOM.appendChild(bookDOM);
  })
}

function openDialog() {
  dialogDOM.showModal();
}

addBookBtnDOM.addEventListener("click", openDialog);

/* HARD CODED BOOKS */
addBookToLibrary("Harry Potter", "J. K. Rowlings", 444, false);
addBookToLibrary("Game of Thrones", "R. R. Martin", 600, false);
addBookToLibrary("Blue Lock", "Mangaka", 20, true);

displayBooks();