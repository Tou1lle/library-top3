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
  const alreadyCreated = getBookIDsDOM();

  bookLibrary.forEach(book => {
    if (alreadyCreated.includes(book.id)) return;

    const bookDOM = document.createElement("div");
    const nameDOM = document.createElement("p");
    const authorDOM = document.createElement("p");
    const pagesDOM = document.createElement("p");
    const buttonContainerDOM = document.createElement("div");
    const buttonReadDOM = document.createElement("button");
    const removeBookDOM = document.createElement("button");

    bookDOM.classList.add("book");
    nameDOM.classList.add("book-name");
    authorDOM.classList.add("book-author");
    pagesDOM.classList.add("book-pages");
    buttonContainerDOM.classList.add("button-container");
    buttonReadDOM.classList.add("book-read");
    bookDOM.dataset.id = book.id;
    removeBookDOM.classList.add("remove-self-btn")

    nameDOM.textContent = book.name;
    authorDOM.textContent = book.author;
    pagesDOM.textContent = book.pages;
    buttonReadDOM.textContent = book.read === true ? "READ" : "NOT READ";
    removeBookDOM.textContent = "REMOVE ME:(";

    checkRead(book, buttonReadDOM);
    buttonReadDOM.addEventListener("click", toggleRead);
    
    removeBookDOM.addEventListener("click", event => {
      const index = getIndexOfBook(book);
      bookLibrary.splice(index, 1);
      event.currentTarget.parentNode.parentNode.remove();
    });

    /*
    removeBookDOM.addEventListener("click", event => {
      const currentID = getIDClicked(event);
      
    });
    */

    bookDOM.append(nameDOM, authorDOM, pagesDOM, buttonContainerDOM);
    buttonContainerDOM.append(buttonReadDOM, removeBookDOM);

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
  let pages = inputPages.value;
  let read = inputRead.checked;

  addBookToLibrary(name, author, pages, read);
}

function checkRead(book, buttonRead) {
  if (book.read === true) {
    buttonRead.classList.add("positive-read");
  }
}

function toggleRead(e) {
  const btn = e.currentTarget;
  btn.classList.toggle("positive-read")

  if (btn.classList.contains("positive-read")) {
    btn.textContent = "READ";
  } else {
    btn.textContent = "NOT READ";
  }
}

function getBooksDOM() {
  return document.querySelectorAll("div.book");
}

function getBookIDsDOM() {
  const booksDOM = getBooksDOM();
  const booksArr = Array.from(booksDOM);

  const createdIDs = booksArr.map((book) => {
    return book.dataset.id;
  });

  return createdIDs;
}

function getIDClicked(e) {
  console.log(e.currentTarget.parentNode.parentNode.dataset.id)
  return e.currentTarget.parentNode.parentNode.dataset.id;
}

function getIndexOfBook(book) {
  console.log(bookLibrary.map(book => book.id).indexOf(book.id));
  return bookLibrary.map(book => book.id).indexOf(book.id);
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
//addBookToLibrary("Harry Potter", "J. K. Rowlings", 444, false);
//addBookToLibrary("Game of Thrones", "R. R. Martin", 600, false);
//addBookToLibrary("Blue Lock", "Mangaka", 20, true);

//displayBooks();

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