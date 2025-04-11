const bookLibrary = [];

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