const myLibrary = [];
const libraryTableBody = document.getElementById("books");
const newBookButton = document.getElementById("new-book");
const newBookDialog = document.getElementById("new-book-dialog");
const closeBookDialog = document.getElementById("close-dialog");
const form = document.getElementById("add-book-form");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  info() {
    if (read) {
      readMsg = "read";
    } else {
      readMsg = "not read yet";
    }
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`
    );
  }
}

function updateLibrary() {
  libraryTableBody.innerHTML = "";
  for (const book of myLibrary) {
    //Add Books the the table in html
    const bookRow = document.createElement("tr");
    bookRow.dataset.id = book.id;

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
    if (book.read) {
      bookRead.textContent = "Read";
    } else {
      bookRead.textContent = "Unread";
    }
    bookRow.appendChild(bookRead);
    //Actions
    const bookActions = document.createElement("td");
    bookActions.classList.add("actions");
    const bookDeleteButton = document.createElement("button");
    bookDeleteButton.classList.add("delete-book");
    bookDeleteButton.textContent = "Delete";
    bookDeleteButton.addEventListener("click", () =>
      deleteBookFromLibrary(book.id)
    );
    bookActions.appendChild(bookDeleteButton);
    const bookReadButton = document.createElement("button");
    if (book.read) {
      bookReadButton.textContent = "Unread Book";
    } else {
      bookReadButton.textContent = "Read Book";
    }

    bookReadButton.addEventListener("click", function () {
      book.read = !book.read;
      updateLibrary();
    });
    bookActions.appendChild(bookReadButton);
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
updateLibrary();
