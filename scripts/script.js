const myLibrary = [];
let id = 0;

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id++;

    this.readString = read ? "already read" : "not read yet"

    this.info = function() {
        return  (this.title+" by "+this.author
                +", "+this.pages+" pages, "+readString)
    }
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
    this.readString = this.read ? "already read" : "not read yet"
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Otonari no Tenshi", "Saekisan", 180, true);
addBookToLibrary("Harry Potter y la piedra filosofal", "J.K Rowling", 309, true);
addBookToLibrary("Cien años de soledad", "Gabriel García Márquez", 471, true);

function displayBook(book){
    const card = document.querySelector(".card");
    const cards = document.querySelector(".cards-section");
    
    let newCard = card.cloneNode(true);
    let title = newCard.querySelector(".title");
    title.textContent = book.title;
    let author = newCard.querySelector(".author");
    author.textContent = book.author;
    let pages = newCard.querySelector(".pages");
    pages.textContent = book.pages.toString()+" pages";
    let read = newCard.querySelector(".read");
    read.textContent = book.readString;

    newCard.setAttribute("data-id",book.id);
    newCard.removeAttribute("hidden");
    cards.append(newCard);

}

function displayBooks(){
    myLibrary.forEach((book) => {
        displayBook(book)
    })
}

displayBooks();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("div.div-button>button");
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");

showButton.addEventListener("click", () => {
    dialog.showModal();
});
cancelButton.addEventListener("click", () => {
    dialog.close();
});
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(document.querySelector("form"));
    addBookToLibrary(formData.get("name"),formData.get("author"),parseInt(formData.get("pages"),10),formData.get("read"));
    displayBook(myLibrary.slice(-1)[0]);
    dialog.close();
});

const deleteButtons = document.querySelectorAll(".button-delete");

deleteButtons.forEach((button) => {
    const parentCard = button.closest(".card");
    const bookId = parentCard.getAttribute("data-id");

    let index = myLibrary.findIndex(book => book.id === parseInt(bookId))

    button.addEventListener("click", (event) => {
        myLibrary.splice(index,1)
        parentCard.remove()
    })
})

const readButtons = document.querySelectorAll(".button-read");

readButtons.forEach((button) => {
    const parentCard = button.closest(".card");
    const bookId = parentCard.getAttribute("data-id");

    let index = myLibrary.findIndex(book => book.id === parseInt(bookId))


    button.addEventListener("click", (event) => {
        let book = myLibrary[index];
        book.toggleRead();
        parentCard.querySelector(".read").textContent = book.readString;
    })
})