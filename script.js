const myLibrary = [];
const libraryTableBody = document.getElementById("books");
const newBookButton = document.getElementById("new-book");
const newBookDialog = document.getElementById("new-book-dialog");
const closeBookDialog = document.getElementById("close-dialog");
const form = document.getElementById("add-book-form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    if (read) {
      readMsg = "read";
    } else {
      readMsg = "not read yet";
    }
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`
    );
  };
}

function updateLibrary() {
  libraryTableBody.innerHTML = "";
  for (const book of myLibrary) {
    //Add Books the the table in html
    const bookRow = document.createElement("tr");
    //Title
    const bookTitle = document.createElement("td");
    bookTitle.innerHTML = book.title;
    bookRow.appendChild(bookTitle);
    //Author
    const bookAuthor = document.createElement("td");
    bookAuthor.innerHTML = book.author;
    bookRow.appendChild(bookAuthor);
    //Pages
    const bookPages = document.createElement("td");
    bookPages.innerHTML = book.pages;
    bookRow.appendChild(bookPages);
    //Read
    const bookRead = document.createElement("td");
    bookRead.innerHTML = book.read;
    bookRow.appendChild(bookRead);
    //Actions
    const bookActions = document.createElement("td");
    const bookDelete = document.createElement("button");
    bookDelete.classList.add("delete-book");
    bookRow.id = book.id;
    bookDelete.innerHTML = "Delete";
    bookDelete.addEventListener("click", () => deleteBookFromLibrary(book.id));

    bookActions.appendChild(bookDelete);
    bookRow.appendChild(bookActions);

    libraryTableBody.appendChild(bookRow);
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLibrary();
}

function deleteBookFromLibrary(bookId) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id == bookId) {
      myLibrary.splice(i, 1);
    }
  }
  updateLibrary();
}

//dialog

function newBook() {
  newBookDialog.showModal();
}

newBookButton.addEventListener("click", newBook);

closeBookDialog.addEventListener("click", () => {
  newBookDialog.close();
});

function addBookButtonAction(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read");
  book = new Book(title, author, pages, !!read);
  addBookToLibrary(book);
  updateLibrary();
  newBookDialog.close();
  form.reset();
}
form.addEventListener("submit", addBookButtonAction);

//tests
theHobbit = new Book("The Hobbit", "J.R.R Tolkein", 295, false);
addBookToLibrary(theHobbit);

theHobbit = new Book("The Hobbit", "J.R.R Tolkein", 295, true);
addBookToLibrary(theHobbit);
