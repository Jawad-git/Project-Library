let Books = [];
let Id = 0;
function makeBook(title, author, hasRead, page)
{
    this.title = title;
    this.author = author;
    this.hasRead = hasRead;
    this.page = page;
    this.Id = ++Id;
}

makeBook.prototype["printDescription"] = function ()
{
    return "the title is " + this.title + " and the author is " + this.author + 
    (this.hasRead == true)? " and it's been read": " and its yet to be read, the "
    + "reader is currently at page " + this.page;   
};

makeBook.prototype.toggleRead = function ()
{
    if (this.hasRead == true)
        this.hasRead = false;
    else
        this.hasRead = true;
    return this.hasRead;
}

function addBook(title, author, hasRead, page)
{
    let book = new makeBook(title, author, hasRead, page);
    Books.push(book);
    return book;
}
Books.push(new makeBook("To Kill a Mockingbird", "Harper Lee", true, 324));
Books.push(new makeBook("1984", "George Orwell", false, 100));
Books.push(new makeBook("The Great Gatsby", "F. Scott Fitzgerald", true, 180));
Books.push(new makeBook("Moby Dick", "Herman Melville", false, 50));

function createTable()
{
    // check if the table already exists and remove it if it does
    let existingTable = document.querySelector('table.entries');
    if (existingTable) {
        existingTable.remove();
    }
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.textContent = "Book Title";
    let th2 = document.createElement('th');
    th2.textContent = "Author";
    let th3 = document.createElement('th');
    th3.textContent = "Read yet?";
    let th4 = document.createElement('th');
    th4.textContent = "Page Reached";
    let th5 = document.createElement('th');
    th5.textContent = "Delete book";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    table.appendChild(tr);
    table.classList.add("entries");
    document.body.insertBefore(table, document.getElementById("newBook"));
}

function addToTable(book)
{
    let table = document.querySelector("table.entries")
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.textContent = book.title;
    let td2 = document.createElement('td');
    td2.textContent = book.author;
    let td3 = document.createElement('td');
    td3.textContent = book.hasRead;
    var toggleReadButton = document.createElement("button");   // var because function scoped
    toggleReadButton.innerHTML= "toggle";
    toggleReadButton.classList.add("toggle");
    toggleReadButton.addEventListener("click", () =>
    {
        book.toggleRead();
        td3.textContent = book.hasRead;
        td3.appendChild(toggleReadButton);
    });
    td3.appendChild(toggleReadButton);
    let td4 = document.createElement('td');
    td4.textContent = book.page;
    let td5 = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete"; // Add text to delete button
    deleteButton.addEventListener('click', () => {
        let index = Books.findIndex(b => b.Id === book.Id);
        if (index > -1) {
            Books.splice(index, 1); // Remove book from the Books array
            tr.remove(); // Remove the row from the table
        }
    });
    td5.appendChild(deleteButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    table.appendChild(tr);
}


function booksDescription()
{
    createTable();
    let table = document.querySelector('table.entries');
    Books.forEach(book => {
        addToTable(book);
    });
}

function createForm() {
    let title = document.createElement("input")
    title.classList.add("title");
    title.setAttribute("placeholder", "Book Title");

    let author = document.createElement("input");
    author.classList.add("author");
    author.setAttribute("placeholder", "Author Name");

    let page = document.createElement("input");
    page.classList.add("page");
    page.setAttribute("placeholder", "Current Page");

    let hasRead = document.createElement("input");
    hasRead.classList.add("hasRead");
    hasRead.setAttribute("type", "checkbox"); // Set input type to checkbox

    let submit = document.createElement("button");
    submit.setAttribute("id", "submitForm");
    submit.setAttribute("type", "submit");
    submit.innerHTML= "submit book";
    // Optional: Append these elements to the form or DOM
    let form = document.createElement("form");
    form.setAttribute("id", "bookForm")
    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(page);
    form.appendChild(hasRead);
    form.appendChild(submit);
    document.body.appendChild(form); // Append the form to the body or another element in the DOM
}


bookButton = document.querySelector("#newBook");
bookButton.addEventListener("click", createForm);

document.body.addEventListener("submit", (event) => {
    if (event.target && event.target.id === "bookForm") {
        event.preventDefault();
        let title = document.querySelector('.title').value;
        let author = document.querySelector('.author').value;
        let page = document.querySelector('.page').value;
        let hasRead = document.querySelector('.hasRead').checked;
        let book = addBook(title, author, hasRead, page);
        addToTable(book);
    }
});

booksDescription();