const bookLibrary = [];
const libraryDOM = document.querySelector(".library");
const addBookBtnDOM = document.querySelector("button.add-book");
const dialogDOM = document.querySelector("dialog");

const inputName = document.querySelector("input#form-name");
const inputAuthor = document.querySelector("input#form-author");
const inputPages = document.querySelector("input#book-pages");
const inputRead = document.querySelector("input[type='checkbox']");
const addBookBtnForm = document.querySelector("button.form-add");
const closeForm = document.querySelector("button.form-close");
const form = document.querySelector("form");

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
    bookDOM.dataset.id = book.id;

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

function closeDialog() {
  dialogDOM.close();
}

function clearForm() {
  form.reset();
}

function createBookFromForm() {
  let name = inputName.value;
  let author = inputAuthor.value;
  let pages = inputAuthor.value;
  let read = true;

  addBookToLibrary(name, author, pages, read);
}

function getBooksDOM() {
  return document.querySelectorAll("div.book");
} 

addBookBtnDOM.addEventListener("click", openDialog);

closeForm.addEventListener("click", (event) => {
  event.preventDefault();
  clearForm();
  closeDialog();
});

addBookBtnForm.addEventListener("click", (event) => {
  event.preventDefault();
  createBookFromForm();
  clearForm();
  closeDialog();
  displayBooks();
});

/* HARD CODED BOOKS */
addBookToLibrary("Harry Potter", "J. K. Rowlings", 444, false);
addBookToLibrary("Game of Thrones", "R. R. Martin", 600, false);
addBookToLibrary("Blue Lock", "Mangaka", 20, true);

displayBooks();

/**
 * DUPLICATES FROM FUNCTION DISPLAYBOOKS
 * 
 * -> Compare the generated ID with the attribute on the DOM element (will be added for the remove function)
 *  - This comparison kinda scales badly -> a lot of books, would compare from beginning everytime
 * 
 * -> Get a Nodelist of Books -> for the length
 *  - Start displaying books from the last index
 *  - So everytime a new book is added, it is generated only that one
 *    according the the nodelist length
 *  - this should not affect removing the books (will be used self remove on the node itself)
 * 
 * -> Get array list of the IDs from created Nodes
 *  - when using the display function, check if the ID is already in some Node
 *  - If yes, then dont create the Node again
 *  - This may be worse on memory, but seems more consistent by checking everytime
 */